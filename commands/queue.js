module.exports = {
	name: 'queue',
	description: 'Queue command.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Não tem nada tocando.');
		return message.channel.send(`
__**Fila de Músicas:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Tocando Agora:** ${serverQueue.songs[0].title}
		`);
	}
};