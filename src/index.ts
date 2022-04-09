import Discord from "discord.js";
import fs from 'fs';
import path from 'path';
import config from "./config";

const client = new Discord.Client({ intents: 32767 });

const init = async () => {
  const evtFiles = await fs.readdirSync(path.resolve(__dirname, 'events'));

  await Promise.all(evtFiles.map(async (file) => {
    const eventName = file.split('.')[0];
    const { default: event } = await import(`./events/${file}`);
    client.on(eventName, (env) => event?.(env, client));
  })).then(() => console.log('[#LOG]', `Carregando o total de ${evtFiles.length} eventos.`))

  client.on('error', err => console.error('[#ERROR]', err));

  client.login(config.bot.token);
};
init();