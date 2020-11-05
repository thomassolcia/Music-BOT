const db = require('quick.db');
exports.run = (client, message, args) => {
    let lang = 0;
    lang = db.get(`guild_${message.guild.id}_lang_${lang}`)

    if (lang == 1) {
        let queue = client.queues.get(message.guild.id);
        if (!queue) return message.channel.send("Não tem nada tocando no momento.");
        try {
            init = 0;
            const embed = {
                "color": "ORANGE",
                "fields": [
                    {
                        "name": "**Fila de Músicas:**",
                        "value": `${queue.songs.map(song => `[${++init}]. ` + song.title).join('\n')}`
                    },
                    {
                        "name": "**Tocando Agora:**",
                        "value": `**[${queue.songs[0].title}](${queue.songs[0].url})**`
                    }
                ]
            };
            return message.channel.send({ embed });
        } catch {
            init = '**-**';
            const embed = {
                "color": "ORANGE",
                "fields": [
                    {
                        "name": "**Fila de Músicas:**",
                        "value": `Vazia...`
                    }
                ]
            };
            return message.channel.send({ embed });
        }
    } else if (lang == 2) {
        let queue = client.queues.get(message.guild.id);
        if (!queue) return message.channel.send("There's nothing playing at the moment.");
        try {
            init = 0;
            const embed = {
                "color": "ORANGE",
                "fields": [
                    {
                        "name": "**Songs Queue:**",
                        "value": `${queue.songs.map(song => `[${++init}]. ` + song.title).join('\n')}`
                    },
                    {
                        "name": "**Playing Now:**",
                        "value": `**[${queue.songs[0].title}](${queue.songs[0].url})**`
                    }
                ]
            };
            return message.channel.send({ embed });
        } catch {
            init = '**-**';
            const embed = {
                "color": "ORANGE",
                "fields": [
                    {
                        "name": "**Songs Queue:**",
                        "value": `Empty...`
                    }
                ]
            };
            return message.channel.send({ embed });
        }
    }
};
