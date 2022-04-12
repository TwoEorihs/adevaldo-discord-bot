import { format, isToday } from "date-fns";
import { convert } from "html-to-text";
import cron from "node-cron";
import removeAccents from "remove-accents";
import RSSParser from "rss-parser";
import config from "../config";
import { client } from "./../index";

interface INews {
  title: string;
  timestamp: number;
  isToday: boolean;
  content: string[];
}
const formatContent = function (content: string) {
  const toConvert = content
    .replaceAll(/(<s|<\/s)(.*?)(>)/g, "**")
    .replaceAll(/(<p|<\/p)(.*?)(>)/g, "#");

  const text = convert(toConvert, {
    wordwrap: false,
  });

  const body = text
    .replace(/\n/g, " ")
    .replace(/^Filipe\sDeschamps\sNewsletter\s?/, "")
    .replace(/\s*:*\s*Link\s(patrocinado|afiliado)/gi, ".")
    .replace(/Cancelar\sinscrição.*$/, "")
    .replace(/\[.*?\]/g, "")
    .replace(
      /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,
      ""
    )
    .replace(/\s\s+/g, " ")
    .trim()
    .split("#");

  return body;
};

export const requesNews = async (): Promise<INews | undefined> => {
  const url = process.env.NEWSLETTERS_KILLER_URL;
  if (!url) return;

  const parser = new RSSParser();
  const feed = await parser.parseURL(url);

  const newsArr: INews[] = await Promise.all(
    feed.items.map((item) => ({
      title: removeAccents(item?.title || "").replace(/['"“”‘’„”«»]/g, ""),
      timestamp: (item?.isoDate && +new Date(item?.isoDate)) || 0,
      isToday: (item?.isoDate && isToday(new Date(item?.isoDate))) || false,
      content: formatContent(item?.content || ""),
    }))
  );

  return newsArr.find((news) => news.isToday);
};

export default async () => {
  const channels = await client.channels.fetch(config.bot.newsChannelId);
  if (channels?.isText()) {
    cron.schedule(
      "0 0 12 * * 1-5",
      async () => {
        const news = await requesNews();
        console.log(news);
        if (news?.content) {
          channels.send(
            `*** Noticias - ${format(
              new Date(news.timestamp),
              "dd 'de' MMMM 'de' yyyy"
            )} ***`
          );
          await Promise.all(
            news.content.map(async (n) =>
              new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {
                if (n.length > 10)
                  channels.send(`>>> :white_small_square:${n}`);
              })
            )
          ).then(() => {
            channels.send("Fonte: https://filipedeschamps.com.br/newsletter");
          });
        }
      },
      {
        scheduled: true,
        timezone: "America/Sao_Paulo",
      }
    );
  }
};
