const db = require('quick.db');
exports.run = (client, message, args) => {
  let lang = 0;
  lang = db.get(`guild_${message.guild.id}_lang_${lang}`)
  if (lang == 1) {
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
