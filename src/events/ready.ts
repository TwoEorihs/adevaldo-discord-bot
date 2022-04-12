import { Client, ClientEvents } from "discord.js";
import config from "../config";
import newsLetters from "../modules/news-letters";

export default async (events: ClientEvents, client: Client) => {
  console.warn("[#LOG]", `Bot is aready!`);
  const guild = await client.guilds.fetch(config.bot.guidId);
  newsLetters();
};
