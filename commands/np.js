module.exports = {
	name: 'np',
	description: 'Now playing command.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Não tem nada tocando neste momento.');
		return message.channel.send(`🎶 Tocando agora: **${serverQueue.songs[0].title}**`);
	}
};