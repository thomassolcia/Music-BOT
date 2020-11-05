const db = require('quick.db');
exports.run = (client, message, args) => {
    let lang = 0;
    lang = db.get(`guild_${message.guild.id}_lang_${lang}`)
    if (lang == 1) {
        const queue = client.queues.get(message.guild.id);
        if (!queue) {
            return message.reply("não existe nenhuma música sendo reproduzida");
        }
        queue.songs = [];
        client.queues.set(message.guild.id, queue);
        message.react('🛑');
        queue.dispatcher.end();
    } else if (lang == 2) {
        const queue = client.queues.get(message.guild.id);
        if (!queue) {
            return message.reply("there is no music playing");
        }
        queue.songs = [];
        client.queues.set(message.guild.id, queue);
        message.react('🛑');
        queue.dispatcher.end();
    }
};