import * as dotenv from "dotenv";

dotenv.config();

const botToken = process.env.BOT_TOKEN || "";
const botId = process.env.BOT_ID || "";

export const bot = {
  id: botId,
  token: botToken,
};

export default {
  bot,
};
