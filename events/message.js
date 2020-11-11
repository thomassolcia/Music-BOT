const Discord = require('discord.js');
module.exports = (client, message) => {
  if (message.author.bot) return;
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const exports = client.commands.get(command);
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  if (message.channel.type === 'dm') {
    message.reply('Você só pode executar este comando num servidor.')
    return
  } else {
    try {
      exports.run(client, message, args);
    }
    catch (err) {
      var d = new Date();
      var n = `${d.getHours()}:${d.getMinutes()}`;
      console.log(`Ocorreu um erro: ${err}\nComando utilizado: ${message.content}\nHorário: ${n}\n`)
      const embed = new Discord.MessageEmbed()
        .setTitle(`Este comando não existe ou o formato está incorreto.`)
        .setDescription("Digite `p.help` para mais informações!")
        .addField('Erro:', `\`${err}\``)
        .setColor("ORANGE")
        .setTimestamp()
        .setFooter(message.author.tag)
      message.channel.send(embed)
    }
  }
};