module.exports = {
	name: 'queue',
	description: 'Queue command.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Não tem nada tocando.');
		init = '**-**';
		const embed = {
			"title": 'Proerd ™ - Music',
			"description": '⏸ A música foi pausada pra você!',
			"color": "YELLOW",
			"fields": [
                {
                    "name": "**Fila de Músicas:**",
                    "value": serverQueue.songs.map(song => init + song.title).join('\n')
                },
                {
                    "name": "**Tocando Agora:**",
                    "value":  serverQueue.songs[0].title
                }
                ]
		};
		return message.channel.send({embed});
	}
};