import * as dotenv from "dotenv";

dotenv.config();

export const bot = {
  id: process.env.BOT_ID || "",
  token: process.env.BOT_TOKEN || "",
  guid: process.env.GUID_ID || ""
};

export default {
  bot,
};
