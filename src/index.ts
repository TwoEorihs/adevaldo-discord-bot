import Discord from "discord.js";
import fs from "fs";
import path from "path";
import config from "./config";
export const client = new Discord.Client({ intents: 32767 });

const loadCommands = async () => {
  const cmdFiles = await fs.readdirSync(path.resolve(__dirname, "commands"));
  await Promise.all(
    cmdFiles.map(async (file) => {
      console.log(file);

      const { default: module } = await import(`./commands/${file}`);
    })
  ).then(() =>
    console.log("[#LOG]", `Carregando o total de ${cmdFiles.length} eventos.`)
  );
};

const loadEvents = async () => {
  const evtFiles = await fs.readdirSync(path.resolve(__dirname, "events"));

  await Promise.all(
    evtFiles.map(async (file) => {
      const eventName = file.split(".")[0];
      const { default: event } = await import(`./events/${file}`);
      client.on(eventName, event);
    })
  ).then(() =>
    console.log("[#LOG]", `Carregando o total de ${evtFiles.length} eventos.`)
  );
};

const init = async () => {
  // loadCommands();
  loadEvents();

  client.on("error", (err) => console.error("[#ERROR]", err));

  client.login(config.bot.token);
};
init();
