module.exports = {
	name: 'pause',
	description: 'Pause command.',
	cooldown: 5,
	execute(message) {
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
		}else{
			const embed1 = {
				"title": 'Proerd ™ - Music',
				"description": 'Não tem nada tocando, você é esquizofrênico?',
				"color": "YELLOW",
			};
		return message.channel.send({embed1});
		}
	}
};