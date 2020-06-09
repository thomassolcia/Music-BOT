exports.run = (client, message, args) => {
  const serverQueue = message.client.queue.get(message.guild.id);
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    const embed = {
      "title": 'Proerd ™ - Music',
      "description": '⏸ A música foi pausada pra você!',
      "color": "YELLOW",
    };
    return message.channel.send({embed});
  }
  const embed1 = {
    "title": 'Proerd ™ - Music',
    "description": 'Não tem nada tocando, você é esquizofrênico?',
    "color": "YELLOW",
  };
return message.channel.send({embed1});
};
