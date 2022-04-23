import * as dotenv from "dotenv";
import newsLetterConfig from "../constants/newsLetter.json";
import { INewsLetterList } from "./../models/newsLetters";

dotenv.config();

export const bot = {
  id: process.env.BOT_ID || "",
  token: process.env.BOT_TOKEN || "",
  guidId: process.env.GUILD_ID || "",
  newsChannelId: process.env.NEWSLETTERS_CHANNEL_ID || "",
};

export let messagesId: string[] = [];

const newsLetterList: INewsLetterList = newsLetterConfig;

export default {
  bot,
  messagesId,
  newsLetterList,
};
