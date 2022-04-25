import { client } from "./../index";
export default async () => {
  const channel = await client.channels.fetch("968179127121248366");

  if (channel?.isText()) {
    //   // channel?.
    //   // roles as RolesList;
    //   // roles.especiality[0].
    //   // verificar se a mensagem existe
    //   const totalMessages = await channel.messages.fetch({ limit: 100 });
    //   totalMessages.size > 0 &&
    //     totalMessages.forEach((message) => {
    //       message.delete();
    //     });
    //   // ou deletar mensagens anteriores
    //   Object.keys(roles).forEach(async (roleCategory: string) => {
    //     const embed = new MessageEmbed().setColor("RANDOM");
    //     let body = "";
    //     for (const role of (<any>roles)[roleCategory]) {
    //       body += `${role.emoji}  -  ${role.name}\n`;
    //     }
    //     embed.setTitle("Escolha seu cargo");
    //     embed.addField(
    //       "Basta reagir com o emoji correspondente ao cargo que você deseja receber",
    //       body
    //     );
    //     await channel
    //       .send({ content: null, embeds: [embed] })
    //       .then(async (message) => {
    //         await Promise.all(
    //           (<any>roles)[roleCategory].map(async (role: any) => {
    //             await message.react(role.emoji);
    //           })
    //         );
    //         config.messagesId.push(message.id);
    //       });
    //   });
    //   // enviar mensagens
    //   // ouvir react dos usuarios
    //   // setar roles
  }
};
