import { isToday } from "date-fns";
import { convert } from "html-to-text";
import cron from "node-cron";
import removeAccents from "remove-accents";
import RSSParser from "rss-parser";
import config from "../config";
import { client } from "./../index";

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

export const requesNews = async () => {
  const url = process.env.NEWSLETTERS_KILLER_URL;
  if (!url) return;

  const parser = new RSSParser();
  const feed = await parser.parseURL(url);

  const newsArr = feed.items.map((item) => ({
    title: removeAccents(item?.title || "").replace(/['"“”‘’„”«»]/g, ""),
    timestamp: item?.isoDate && +new Date(item?.isoDate),
    timestamp2: item?.isoDate,
    isToday: item?.isoDate && isToday(new Date(item?.isoDate)),
    content: formatContent(item?.content || ""),
  }));

  return newsArr.find((news) => news.isToday);
};

export default async () => {
  const channels = await client.channels.fetch(config.bot.newsChannelId);
  if (channels?.isText()) {
    cron.schedule(
      "0 0 12 * * 1-5",
      async () => {
        requesNews();
        channels.send("running a task every one minutes");
      },
      {
        scheduled: true,
        timezone: "America/Sao_Paulo",
      }
    );
  }
};
