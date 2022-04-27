import config from "../config";
import { client } from "./../index";

export default async () => {
  const channel = await client.channels.fetch("968179127121248366");

  if (channel?.isText()) {
    const totalMessages = await channel.messages.fetch({ limit: 100 });
    totalMessages.size > 0 &&
      totalMessages.forEach((message) => {
        message.delete();
      });
    await channel.send(`\n***Reaja para adquirir seu cargo e prosseguir***\n`);
    Object.keys(config.skillsRoles).forEach(async (skillsRole: string) => {
      const category = config.skillsRoles[skillsRole];
      const body = category
        .map((role) => `${role.emoji} - ${role.tag}\n`)
        .toString()
        .replaceAll("\n,", "\n");
      const msg = await channel.send(`\n***${skillsRole}***\n>>> ${body}\n`);
      category.map((role) => role?.emoji && msg.react(role?.emoji));
    });
  }
};
