const { JPEGStream } = require("canvas");
const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
module.exports = {
  name: "avatar",
  category: "General",
  aliases: ["pfp"],
  description: "Lihat avatarmu/user lain",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   */
  run: async (client, message, args) => {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) =>
          ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    const avatarpng = target.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "png",
    });
    const avatarjpg = target.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "png",
    });
    const avatarwebp = target.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "webp",
    });
    const avatargif = target.displayAvatarURL({
      size: 1024,
      dynamic: true,
      format: "gif",
    });

    const row = new MessageActionRow().addComponents(
      new MessageButton().setStyle("LINK").setLabel("PNG").setURL(avatarpng),
      new MessageButton().setStyle("LINK").setLabel("WEBP").setURL(avatarwebp),
      new MessageButton().setStyle("LINK").setLabel("GIF").setURL(avatargif)
    );

    const embed = new MessageEmbed({
      color: "AQUA",
      footer: {
        text: `Requested by${message.member.displayName}`,
        icon_url: `${message.member.displayAvatarURL({ dynamic: true })}`,
      },
      image: {
        url: target.displayAvatarURL({
          size: 1024,
          dynamic: true,
          format: "jpg",
        }),
      },
      description:
        "Download avatar dengan klik button dibawah sesuai format yg diinginkan",
    });

    try {
      message.reply({
        embeds: [embed],
        components: [row],
        allowedMentions: { repliedUser: true },
      });
    } catch (Err) {
      message.reply({
        embeds: [
          new MessageEmbed({
            color: "AQUA",
            description: "Perintah mengalami error!",
          }),
        ],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
