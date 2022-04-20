const { Client, Message, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndent } = require("common-tags");
const db = require("quick.db");
let color = "#ff0000";

const create_mh = require("../../Structures/function/menu");
module.exports = {
  name: "help",
  category: "General",
  aliases: ["h"],
  description: "Help command",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   */
  run: async (client, message, args) => {
    const prefix = db.fetch(`prefix_${message.guild.id}`);
    let categories = [];
    let cots = [];

    if (!args[0]) {
      let ignored = ["test"];
      const emo = {
        developer: "❗",
        premium: "<a:verify:799539329235025923>",
        system: "🔧",
        general: "⚙️",
      };

      let ccate = [];
      readdirSync("./bot/commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const commands = readdirSync(`./bot/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        if (ignored.includes(dir.toLowerCase())) return;

        const name = `${emo[dir.toLowerCase()]} - ${dir}`;
        let nome = dir.toUpperCase();

        let cats = new Object();
        cats = {
          name: name,
          value: `\`${prefix}help ${dir.toLowerCase()}\``,
          inline: true,
        };

        categories.push(cats);
        ccate.push(nome);
      });

      const description = stripIndent`
            Prefix ${prefix} 
            Gunakan drop menu untuk melihat bantuan dengan detail category
            Kamu juga bisa menggunakan ${prefix}help [category]
			Interaksi ini mungkin tidak bisa digunakan [interaction failed] ketika bot istirahat! [restarting]
            `;
      const embed = new MessageEmbed()
        .setTitle(`Bot Commands`)
        .setDescription(`\`\`\`asciidoc\n${description}\`\`\``)
        .addFields(categories)
        .setTimestamp()
        .setColor(color);

      let menus = create_mh(ccate);
      return message
        .reply({
          embeds: [embed],
          components: menus.smenu,
        })
        .then((msgg) => {
          const menuID = menus.sid;

          const select = async (interaction) => {
            if (interaction.customId != menuID) return;

            let { values } = interaction;

            let value = values[0];

            let catts = [];

            readdirSync("./bot/commands/").forEach((dir) => {
              if (dir.toLowerCase() !== value.toLowerCase()) return;
              const commands = readdirSync(`./bot/commands/${dir}/`).filter(
                (file) => file.endsWith(".js")
              );
              const cmds = commands.map((command) => {
                let file = require(`../../commands/${dir}/${command}`); //getting the commands again

                if (!file.name) return "No command name.";

                let name = file.name.replace(".js", "");

                if (client.commands.get(name).hidden) return;

                let des = client.commands.get(name).description;
                let emo = client.commands.get(name).emoji;
                let emoe = emo ? `${emo} - ` : ``;

                let obj = {
                  cname: `${emoe}\`${name}\``,
                  des,
                };

                return obj;
              });

              let dota = new Object();

              cmds.map((co) => {
                if (co == undefined) return;

                dota = {
                  name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                  value: co.des ? co.des : `No Description`,
                  inline: true,
                };
                catts.push(dota);
              });

              cots.push(dir.toLowerCase());
            });

            if (cots.includes(value.toLowerCase())) {
              const combed = new MessageEmbed()
                .setTitle(
                  `__${
                    value.charAt(0).toUpperCase() + value.slice(1)
                  } Commands!__`
                )
                .setDescription(
                  `Gunakan \`${prefix}help\` dan berikan nama perintah untuk info detail tentang perintah.\nContoh: \`${prefix}help ping\`.\n\n`
                )
                .addFields(catts)
                .setColor(color);

              await interaction.deferUpdate();

              return interaction.message.edit({
                embeds: [combed],
                components: menus.smenu,
              });
            }
          };
          const filter = (interaction) => {
            return (
              !interaction.user.bot && interaction.user.id == message.author.id
            );
          };

          const collector = msgg.createMessageComponentCollector({
            filter,
            componentType: "SELECT_MENU",
          });
          collector.on("collect", select);
          collector.on("end", () => null);
        });
    } else {
      let catts = [];

      readdirSync("./bot/commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./bot/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);
          if (!file.name) return "No command name.";
          let name = file.name.replace(".js", "");
          if (client.commands.get(name).hidden) return;
          let des = client.commands.get(name).description;
          let emo = client.commands.get(name).emoji;
          let emoe = emo ? `${emo} - ` : ``;
          let obj = {
            cname: `${emoe}\`${name}\``,
            des,
          };
          return obj;
        });
        let dota = new Object();
        cmds.map((co) => {
          if (co == undefined) return;
          dota = {
            name: `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
            value: co.des ? co.des : `No Description`,
            inline: true,
          };
          catts.push(dota);
        });

        cots.push(dir.toLowerCase());
      });

      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (cots.includes(args[0].toLowerCase())) {
        const combed = new MessageEmbed()
          .setTitle(
            `__${
              args[0].charAt(0).toUpperCase() + args[0].slice(1)
            } Commands!__`
          )
          .setDescription(
            `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
          )
          .addFields(catts)
          .setColor(color);

        return message.reply({ embeds: [combed] });
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("RED");
        return await message.reply({
          embeds: [embed],
          allowedMentions: {
            repliedUser: false,
          },
        });
      }
      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Command Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setTimestamp(new Date())
        .setColor(color);
      return await message.reply({
        embeds: [embed],
      });
    }
  },
};
