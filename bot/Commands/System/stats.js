const { MessageEmbed, Message, Client } = require("discord.js");
const moment = require("moment");
const { prefix } = require("../../Structures/database/config.json");
const { mem, cpu, os } = require("node-os-utils");
const { stripIndent } = require("common-tags");
const cooldown = new Set();

module.exports = {
  name: "botinfo",
  aliases: ["stats"],
  description: "Shows Bot Statistics",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   */
  run: async (client, message, args) => {
    if (cooldown.has(message.author.id)) {
      message.reply("You Are On CoolDown Wait 10 Seconds");
    } else {
      const d = moment.duration(message.client.uptime);
      const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
      const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
      const clientStats = stripIndent`
          Servers   :: ${message.client.guilds.cache.size}
          Users     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
          Prefix    :: ${prefix}
       `;
      const { totalMemMb, usedMemMb } = await mem.info();
      const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
      // embed
      const embeds = new MessageEmbed({
        title: `${client.user.username} Statistics`,
        color: "AQUA",
        footer: {
          text: `${message.member.displayName}`,
          icon_url: `${message.member.displayAvatarURL({
            size: 1024,
            dynamic: true,
          })}`,
        },
        timestamp: new Date(),
        fields: [
          {
            name: "Commands",
            value: `\`${message.client.commands.size}\` commands`,
            inline: true,
          },
          {
            name: "Aliases",
            value: `\`${message.client.aliases.size}\` aliases`,
            inline: true,
          },
          {
            name: "Client",
            value: `\`\`\`asciidoc\n${clientStats}\`\`\``,
            inline: false,
          },
          {
            name: "Server",
            value: `\`\`\`asciidoc\n${serverStats}\`\`\``,
            inline: false,
          },
        ],
      });
      message.channel.send({ embeds: [embeds] });
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 10000); //10 sec = 10000
  },
};
