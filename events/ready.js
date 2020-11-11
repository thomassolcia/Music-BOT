const db = require('quick.db');
let lang = 1;
module.exports = async client => {
    console.log('\n     [Pronto para utilização]      \n')
    setInterval(() => {
        var quotes = ['p.help', `${client.guilds.cache.size} servidores`]
        client.user.setActivity(
            quotes[Math.floor(quotes.length * Math.random())], { type: 'PLAYING' }
        );
    }, 10000);
}