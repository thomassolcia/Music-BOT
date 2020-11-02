module.exports = async client => {
    console.log('\n     [Pronto para utilização]      \n')
    client.guilds.cache.size
    setInterval(() => {
        var quotes = ['p.help', `${client.guilds.cache.size} servidores`]
        client.user.setActivity(
            quotes[Math.floor(quotes.length * Math.random())], { type: 'PLAYING' }
        );
    }, 10000);
}