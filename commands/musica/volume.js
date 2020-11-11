const db = require('quick.db');
exports.run = (client, message, args) => {
    let lang = 1;
    lang = db.get(`guild_${message.guild.id}_lang_${lang}`)
    if (lang == null) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`Configure o idioma padrão: \`p.lang pt\` ou \`p.lang en\`\nSet the default language: \`p.lang pt\` or \`p.lang en\``)
        message.channel.send(embed)
    } else if (lang == 1) {
        const queue = client.queues.get(message.guild.id);
        if (!queue) {
            return message.reply("não existe nenhuma música sendo reproduzida");
        }
        const volume = Number(args.join(" "));
        if (isNaN(volume) || volume < 0 || volume > 10) {
            return message.reply("o volume deve ser um valor entre 0 e 10").then(msg1 => { msg1.delete({ timeout: 5000 }) });
        } else if (!args[0]) {
            return message.reply(`o volume atual é: ${queue.volume}`).then(msg => { msg.delete({ timeout: 5000 }) });
        }
        queue.dispatcher.setVolume(volume / 10);
        queue.volume = volume;
        client.queues.set(message.guild.id, queue);
    } else if (lang == 2) {
        const queue = client.queues.get(message.guild.id);
        if (!queue) {
            return message.reply("there is no music playing");
        }
        const volume = Number(args.join(" "));
        if (isNaN(volume) || volume < 0 || volume > 10) {
            return message.reply("volume must be a value between 0 and 10").then(msg1 => { msg1.delete({ timeout: 5000 }) });
        } else if (!args[0]) {
            return message.reply(`current volume is: ${queue.volume}`).then(msg => { msg.delete({ timeout: 5000 }) });
        }
        queue.dispatcher.setVolume(volume / 10);
        queue.volume = volume;
        client.queues.set(message.guild.id, queue);
    }
};