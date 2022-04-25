import * as dotenv from "dotenv";
import newsLetterConfig from "../constants/newsLetter.json";
import rolesListConfig from "../constants/roles.json";
import { INewsLetterList } from "./../models/newsLetters";
import { IRolesList } from "./../models/roles";

dotenv.config();

export const bot = {
  id: process.env.BOT_ID || "",
  token: process.env.BOT_TOKEN || "",
  guidId: process.env.GUILD_ID || "",
};

export let messagesId: string[] = [];

const newsLetterList: INewsLetterList = newsLetterConfig;
const rolesList: IRolesList = rolesListConfig;

export default {
  bot,
  messagesId,
  newsLetterList,
  rolesList,
};
