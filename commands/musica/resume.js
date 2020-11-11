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
        message.react('▶️');
        queue.dispatcher.resume();
    } else if (lang == 2) {
        const queue = client.queues.get(message.guild.id);
        if (!queue) {
            return message.reply("there is no music playing");
        }
        message.react('▶️');
        queue.dispatcher.resume();
    }
};