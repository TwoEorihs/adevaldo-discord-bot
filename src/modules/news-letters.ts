import cron from 'node-cron';
import config from '../config';
import { client } from './../index';

export default async () => {
    const channels = await client.channels.fetch(config.bot.newsChannelId);
    if (channels?.isText()) {
        cron.schedule('*/1 * * * *', async () => {
            console.log('running a task every one minutes');
            channels.send('running a task every one minutes')
        }, {
            scheduled: true,
            timezone: "America/Sao_Paulo"
        });
    }
}