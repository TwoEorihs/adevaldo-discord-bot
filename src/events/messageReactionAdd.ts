import { MessageReaction, User } from "discord.js";

export default async (messageReaction: MessageReaction, user: User) => {
  // if (user.bot) return;
  // else {
  //   messageReaction.users.remove(user.id);
  //   const index = config.messagesId.indexOf(messageReaction.message.id);
  //   roles[index].forEach((role) => {
  //     if (role.emoji == messageReaction.emoji.name) {
  //       messageReaction.message.guild?.roles
  //         .fetch(role.id, { force: true })
  //         .then((role) => {
  //           const bool = role?.members.filter((member) =>
  //             member.user.id.includes(user.id)
  //           );
  //           bool?.size
  //             ? messageReaction.message.guild?.members
  //                 .fetch(user.id)
  //                 .then((member) => {
  //                   member.roles.remove(role?.id || "");
  //                 })
  //             : messageReaction.message.guild?.members
  //                 .fetch(user.id)
  //                 .then((member) => {
  //                   member.roles.add(role?.id || "");
  //                 });
  //         });
  //     }
  //   });
  // }
};
