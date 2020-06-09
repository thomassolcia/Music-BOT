exports.run = (client, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    const embed = {
      "title": 'Proerd ™ - Music',
      "description": '▶ Voltando a tocar a música para você!',
      "color": "YELLOW",
      };
      return message.channel.send({embed});
  }
  const embed1 = {
    "title": 'Proerd ™ - Music',
    "description": 'Não tinha nada tocando antes aqui.',
    "color": "YELLOW",
    };
    return message.channel.send({embed1});
};
