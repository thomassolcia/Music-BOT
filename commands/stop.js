module.exports = {
	name: 'stop',
	description: 'Stop command.',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Você precisa estar em um canal de voz primeiro!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Não tem nada tocando no momento.');
		serverQueue.songs = [];
		const embed = {
			"title": 'Proerd ™ - Music',
			"description": 'Músicas encerradas!',
			"color": "YELLOW",
		};
		message.channel.send({embed});
		serverQueue.connection.dispatcher.end();
	}
};