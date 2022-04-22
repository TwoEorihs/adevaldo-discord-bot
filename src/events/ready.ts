import { Client, ClientEvents } from "discord.js";
import welcome_message from "../modules/welcome_message";
import newsLetters from "../modules/news-letters";

export default async (events: ClientEvents) => {
  console.warn("[#LOG]", `Bot is aready!`);
  newsLetters();
  welcome_message();
};
