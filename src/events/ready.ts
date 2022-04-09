import { Client, ClientEvents } from "discord.js";
import config from "../config";
import newsLetters from "../modules/news-letters";

export default async (events: ClientEvents, client: Client) => {
    const guild = (await client.guilds.fetch(config.bot.guidId));
    newsLetters();
}