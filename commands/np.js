exports.run = (client, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('Não tem nada tocando neste momento.');
  const embed = {
    "title": 'Proerd ™ - Music',
    "description": '🎶 Tocando agora: **' + serverQueue.songs[0].title + '**',
    "color": "YELLOW",
  };
    message.channel.send({embed});
};
