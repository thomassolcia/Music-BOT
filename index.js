require("dotenv").config();
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;
client.queue = new Map();
client.queues = new Map();
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});
client.commands = new Enmap();
console.log(`[✔️  ] Carregado | [❌ ] Com erro`);
console.log('\n     [Status dos Comandos]      \n')
fs.readdir(__dirname + "/commands/musica/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/musica/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`[✔️  ] ${commandName}`);
    });
});
client.login(config.token);