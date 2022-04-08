import Discord from "discord.js";
import Config from "./config/index.mjs";

const client = new Discord.Client({ intents: 32767 });

client.on("ready", async () => {
  try {
    console.log(`Logged in as ${client.user.tag}!`);

    const guilds = await client.guilds.fetch();

    guilds.forEach(async (guild) => {
      const guildInfo = await guild.fetch();

      if (guildInfo.id != "962044318548377660") {
        return;
      }

      const channels = await guildInfo.channels.fetch();

      channels.forEach(async (channel) => {
        const channelInfo = await channel.fetch();

        if (channelInfo.permissionsLocked || channelInfo.type != "GUILD_NEWS") {
          return;
        }

        //clear messages
        /*  const messages = await channelInfo.messages.fetch();

        messages.forEach(async (message) => {
          if (message.deletable) {
            console.log(
              `removing message for channelId: ${channelInfo.id} name: ${channelInfo.name} messageId: ${message.id}`
            );

            await message.delete();
          }
        }); */

        const sendedMessage = await channelInfo.send("teste");

        console.log(
          `sended message for channelId: ${channelInfo.id} name: ${channelInfo.name} messageId: ${sendedMessage.id}`
        );
      });
    });
  } catch (err) {
    console.error(err);
  }
});

client.on("message", (msg) => {
  if (!msg.content.includes("!clear")) {
    return;
  }
});

client.login(Config.bot.token);
