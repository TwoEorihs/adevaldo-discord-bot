import { Client, ClientEvents } from "discord.js";
import config from "../config";

export default async (events: ClientEvents, client: Client) => {
    const guild = (await client.guilds.fetch(config.bot.guidId))
    console.log(guild)
}