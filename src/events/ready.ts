import { ClientEvents } from "discord.js";
import newsLetters from "../modules/newsletters";
import welcome_message from "../modules/welcome_message";

export default async (events: ClientEvents) => {
  console.warn("[#LOG]", `Bot is aready!`);
  newsLetters();
  welcome_message();
};
