import { MessageReaction, User } from "discord.js";
import config from "../config/index";

export default async (messageReaction: MessageReaction, user: User) => {
  if (user.bot) return;
  else {
    messageReaction.users.remove(user.id);
    const topic = messageReaction.message.content?.match(
      /(\*\*\*)(.*?)(\*\*\*)/g
    );

    const index = topic?.[0].replaceAll("*", "");
    const emoji = messageReaction.emoji.name;

    if (index) {
      const role = config.skillsRoles[index].find(
        (role) => role.emoji === emoji
      );
      const guild = messageReaction?.message?.guild;

      if (!role || !guild) return;
      const asMember = await guild?.members.fetch(user.id);

      const currentRole = await guild?.roles.fetch(role.id, { force: true });
      const hasRole = currentRole?.members.filter((member) =>
        member.user.id.includes(user.id)
      )?.size;

      hasRole ? asMember?.roles.remove(role.id) : asMember.roles.add(role.id);

      const text = hasRole
        ? `✅ @${user.tag} Roles removida com sucesso!`
        : `✅ @${user.tag} Roles adicionada com sucesso!`;
      messageReaction.message.reply(text).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
    }
  }
};
