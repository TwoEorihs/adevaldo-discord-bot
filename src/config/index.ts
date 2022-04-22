import * as dotenv from "dotenv";

dotenv.config();

export const bot = {
  id: process.env.BOT_ID || "",
  token: process.env.BOT_TOKEN || "",
  guidId: process.env.GUILD_ID || "",
  newsChannelId: process.env.NEWSLETTERS_CHANNEL_ID || "",
};

export let messagesId: string[] = [];

export default {
  bot,
  messagesId,
};
