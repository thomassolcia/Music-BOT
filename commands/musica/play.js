const search = require("yt-search");
const ytdl = require("ytdl-core-discord");
const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let lang = 1;
  lang = db.get(`guild_${message.guild.id}_lang_${lang}`)
  if (lang == null) {
    const embed = new Discord.MessageEmbed()
      .setDescription(`Configure o idioma padrão: \`p.lang pt\` ou \`p.lang en\`\nSet the default language: \`p.lang pt\` or \`p.lang en\``)
    message.channel.send(embed)
  } else if (lang == 1) {
    if (message.content.includes('playlist') || message.content.includes('list') || message.content.includes('index')) {
      return message.reply('Playlists não estão disponíveis para reprodução no momento.')
    }
    const nameUser = message.author.id;
    const s = args.join(" ");
    try {
      search(s, (err, result) => {
        if (err) {
          throw err;
        } else if (result && result.videos.length > 0) {
          const song = result.videos[0];
          const queue = client.queues.get(message.guild.id);
          if (queue) {
            queue.songs.push(song);
            client.queues.set(message.guild.id, queue);
          } else playSong(client, message, song);
          init = 0;
          try {
            if (!queue) {
              const embed1 = new Discord.MessageEmbed()
                .setDescription(`Começando a tocar **[${result.videos[0].title}](${result.videos[0].url})**`)
                .setColor("ORANGE")
              message.channel.send(embed1).then(msgd => {
                msgd.delete({ timeout: (song.seconds) * 1000, reason: 'Feito!' })
              })
            } else {
              init = 0;
              var tEstimado = 0;
              for (var i = 0; i < queue.songs.length - 1; i++) {
                tEstimado += queue.songs[i].seconds;
              }
              var duracao = `${result.videos[0].duration}`;
              var pTocada = `${queue.songs.length - 1}`;
              var pFila = `${queue.songs.length}`;
              const embed1 = new Discord.MessageEmbed()
                .setDescription(`**Adicionada na fila**`)
                .setThumbnail(`${result.videos[0].thumbnail}`)
                .addField('Música', `**[${result.videos[0].title}](${result.videos[0].url})**`)
                .addFields(
                  { name: 'Tempo até ser tocada', value: `≅ ${parseInt(tEstimado / 60)} minutos`, inline: true },
                  { name: 'Duração', value: duracao, inline: true },
                  { name: '\u200B', value: '\u200B', inline: true },
                )
                .addFields(
                  { name: 'Músicas na frente', value: pTocada, inline: true },
                  { name: 'Posição atual na fila', value: pFila, inline: true },
                  { name: '\u200B', value: '\u200B', inline: true },
                )
                .setColor("ORANGE")
              message.channel.send(embed1)
            }
          } catch (err) {
            console.log(err)
          }
        } else {
          return message.reply("desculpe, não encontrei o que você desejava!");
        }
      });
    } catch (e) {
      console.error(e);
    }

    const playSong = async (client, message, song) => {
      let queue = client.queues.get(message.member.guild.id);
      if (!song) {
        if (queue) {
          queue.connection.disconnect();
          return client.queues.delete(message.member.guild.id);
        }
      }
      if (!message.member.voice.channel) {
        queue.songs = [];
        client.queues.set(message.guild.id, queue);
        message.react('🛑');
        queue.dispatcher.end();
        return message.reply(
          "você precisa estar em um canal de voz para reproduzir uma música!"
        );

      } else {
        message.member.voice.channel.join().then(conn => {
          conn.voice.setDeaf(true);
        })
      }

      if (!queue) {
        const conn = await message.member.voice.channel.join()
        queue = {
          volume: 10,
          connection: conn,
          dispatcher: null,
          songs: [song],
        };
      } else {
        var embed = new Discord.MessageEmbed()
          .setDescription(`Começando a tocar **[${queue.songs[0].title}](${queue.songs[0].url})**`)
          .setColor("ORANGE")
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: (queue.songs[0].seconds) * 1000, reason: 'Feito!' })
        })
      }
      queue.dispatcher = await queue.connection.play(
        await ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 50, filter: "audioonly" }),
        {
          type: "opus",
        }
      )
      queue.dispatcher.on("finish", () => {
        queue.songs.shift();
        playSong(client, message, queue.songs[0]);
      });
      client.queues.set(message.member.guild.id, queue);
    };
  } else if (lang == 2) {
    if (message.content.includes('playlist') || message.content.includes('list') || message.content.includes('index')) {
      return message.reply('Playlists are not available for playback yet.')
    }
    const nameUser = message.author.id;
    const s = args.join(" ");
    try {
      search(s, (err, result) => {
        if (err) {
          throw err;
        } else if (result && result.videos.length > 0) {
          const song = result.videos[0];
          const queue = client.queues.get(message.guild.id);
          if (queue) {
            queue.songs.push(song);
            client.queues.set(message.guild.id, queue);
          } else playSong(client, message, song);
          init = 0;
          try {
            if (!queue) {
              const embed1 = new Discord.MessageEmbed()
                .setDescription(`Playing **[${result.videos[0].title}](${result.videos[0].url})**`)
                .setColor("ORANGE")
              message.channel.send(embed1).then(msgd => {
                msgd.delete({ timeout: (song.seconds) * 1000, reason: 'Feito!' })
              })
            } else {
              init = 0;
              var tEstimado = 0;
              for (var i = 0; i < queue.songs.length - 1; i++) {
                tEstimado += queue.songs[i].seconds;
              }
              var duracao = `${result.videos[0].duration}`;
              var pTocada = `${queue.songs.length - 1}`;
              var pFila = `${queue.songs.length}`;
              const embed1 = new Discord.MessageEmbed()
                .setDescription(`**Added to queue**`)
                .setThumbnail(`${result.videos[0].thumbnail}`)
                .addField('Music', `**[${result.videos[0].title}](${result.videos[0].url})**`)
                .addFields(
                  { name: 'Time until played', value: `≅ ${parseInt(tEstimado / 60)} minutes`, inline: true },
                  { name: 'Duration', value: duracao, inline: true },
                  { name: '\u200B', value: '\u200B', inline: true },
                )
                .addFields(
                  { name: 'Songs until played', value: pTocada, inline: true },
                  { name: 'Current queue position', value: pFila, inline: true },
                  { name: '\u200B', value: '\u200B', inline: true },
                )
                .setColor("ORANGE")
              message.channel.send(embed1)
            }
          } catch (err) {
            console.log(err)
          }
        } else {
          return message.reply("sorry, I didn't find what you wanted!");
        }
      });
    } catch (e) {
      console.error(e);
    }

    const playSong = async (client, message, song) => {
      let queue = client.queues.get(message.member.guild.id);
      if (!song) {
        if (queue) {
          queue.connection.disconnect();
          return client.queues.delete(message.member.guild.id);
        }
      }
      if (!message.member.voice.channel) {
        queue.songs = [];
        client.queues.set(message.guild.id, queue);
        message.react('🛑');
        queue.dispatcher.end();
        return message.reply("you need to be on a voice channel to play a song!");
      } else {
        message.member.voice.channel.join().then(conn => {
          conn.voice.setDeaf(true);
        })
      }

      if (!queue) {
        const conn = await message.member.voice.channel.join()
        queue = {
          volume: 10,
          connection: conn,
          dispatcher: null,
          songs: [song],
        };
      } else {
        var embed = new Discord.MessageEmbed()
          .setDescription(`Playing **[${queue.songs[0].title}](${queue.songs[0].url})**`)
          .setColor("ORANGE")
        message.channel.send(embed).then(msg => {
          msg.delete({ timeout: (queue.songs[0].seconds) * 1000, reason: 'Feito!' })
        })
      }
      queue.dispatcher = await queue.connection.play(
        await ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 50, filter: "audioonly" }),
        {
          type: "opus",
        }
      )
      queue.dispatcher.on("finish", () => {
        queue.songs.shift();
        playSong(client, message, queue.songs[0]);
      });
      client.queues.set(message.member.guild.id, queue);
    };
  }
};