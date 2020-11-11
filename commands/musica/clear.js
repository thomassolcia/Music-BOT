const db = require('quick.db');
exports.run = (client, message, args) => {
  let lang = 1;
  lang = db.get(`guild_${message.guild.id}_lang_${lang}`)
  if (lang == null) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Configure o idioma padrão: \`p.lang pt\` ou \`p.lang en\`\nSet the default language: \`p.lang pt\` or \`p.lang en\``)
    message.channel.send(embed)
  } else if (lang == 1) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Você precisa estar em um canal de voz primeiro!"
      );
    let queue = client.queues.get(message.guild.id);
    if (!queue)
      return message.channel.send(
        "Não tem nada tocando no momento."
      );
    queue.songs = [];
    message.react('✔️')
  } else if (lang == 2) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "You need to be on a voice channel first!"
      );
    let queue = client.queues.get(message.guild.id);
    if (!queue)
      return message.channel.send(
        "There's nothing playing at the moment."
      );
    queue.songs = [];
    message.react('✔️')
  }
};
