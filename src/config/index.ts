import * as dotenv from "dotenv";
import masterRolesConfig from "../constants/masterRoles.json";
import newsLetterConfig from "../constants/newsLetter.json";
import skillsRolesConfig from "../constants/skillsRoles.json";
import { INewsLetterList } from "./../models/newsLetters";
import { IMasterRolesList, ISkillsRolesList } from "./../models/roles";

dotenv.config();

export const bot = {
  id: process.env.BOT_ID || "",
  token: process.env.BOT_TOKEN || "",
  guidId: process.env.GUILD_ID || "",
};

export let messagesId: string[] = [];

const newsLetterList: INewsLetterList = newsLetterConfig;
const masterRolesList: IMasterRolesList = masterRolesConfig;
const skillsRoles: ISkillsRolesList = skillsRolesConfig;

export default {
  bot,
  messagesId,
  newsLetterList,
  masterRolesList,
  skillsRoles,
};
