const Discord = require('discord.js');
exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle('PMusic - Help')
        .setDescription(`**[PT-BR] 🇧🇷**\n**p.clear** - Limpa as música da fila (se houver)
**p.next** ou **p.skip** - Pula para a próxima música
**p.p** ou **p.play** - Começa a tocar a música desejada
**p.pause** - Pausa a música que está tocando
**p.queue** - Mostra as músicas da fila (se houver)
**p.resume** - Caso a música esteja pausada ela é resumida
**p.search** ou **p.src** - Pesquisa uma música no youtube, você escolhe qual será reproduzida
**p.stop** - Finaliza as músicas
**p.volume** - Controla o volume das músicas\n\n**[EN]** 🇺🇸\n**p.clear** - Clears songs in the queue (if any)
**p.next** ou **p.skip** - Skip to the next song
**p.p** ou **p.play** - CStarts playing the desired song
**p.pause** - Pause the song that is playing
**p.queue** - Shows the songs in the queue (if any)
**p.resume** - If the song is paused it is summarized
**p.search** ou **p.src** - Search a song on youtube, you choose which will be played
**p.stop** - Finalize the songs
**p.volume** - Controls the volume of songs`)
        .setFooter(`ℹ️ Qualquer problema contatar o dev - awoone#0001
ℹ️ Any problem contact the dev - awoone#0001`)
    message.channel.send(embed)
};