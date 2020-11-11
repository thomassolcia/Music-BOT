const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    let lang = 1;
    if (lang == null) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`Configure o idioma padrão: \`p.lang pt\` ou \`p.lang en\`\nSet the default language: \`p.lang pt\` or \`p.lang en\``)
        message.channel.send(embed)
    } else if (!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setDescription(`Escolha entre \`p.lang pt\` ou \`p.lang en\``)
            .setColor("ORANGE")
        message.channel.send(embed)
    } else {
        if (args[0] == 'pt' || args[0] == 'portugues') {
            lang = db.set(`guild_${message.guild.id}_lang_${lang}`, 1)
            const embed = new Discord.MessageEmbed()
                .setDescription(`Lingugaem setada para \`português\``)
                .setColor("ORANGE")
            message.channel.send(embed)
        } else if (args[0] == 'en' || args[0] == 'english') {
            lang = db.set(`guild_${message.guild.id}_lang_${lang}`, 2)
            const embed = new Discord.MessageEmbed()
                .setDescription(`Language was set to \`english\``)
                .setColor("ORANGE")
            message.channel.send(embed)
        }
    }
}