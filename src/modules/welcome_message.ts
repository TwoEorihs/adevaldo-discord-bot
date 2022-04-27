import config from "../config";
import { client } from "./../index";

export default async () => {
  //TODO: create global var to channelId
  const channel = await client.channels.fetch("963989486096764969");

  if (channel?.isText()) {
    const totalMessages = await channel.messages.fetch({ limit: 100 });
    // totalMessages.size > 0 &&
    //   totalMessages.forEach((message) => {
    //     message.delete();
    //   });
    if (totalMessages.size > 4) return;
    await channel.send(`\n***Reaja para adquirir seu cargo e prosseguir***\n`);
    Object.keys(config.skillsRoles).forEach(async (skillsRole: string) => {
      const category = config.skillsRoles[skillsRole];
      const body = category
        .map((role) => `${role.emoji} - ${role.tag}\n`)
        .toString()
        .replaceAll("\n,", "\n");
      const msg = await channel.send(`>>> ***${skillsRole}***\n${body}\n`);
      category.map((role) => role?.emoji && msg.react(role?.emoji));
    });
  }
};
