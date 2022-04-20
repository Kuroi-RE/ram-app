const { Client, Message, MessageEmbed, Interaction } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "remind-me",
  category: "General",
  aliases: ["remind"],
  description: "Berikan pesan kepada dirimu untuk masa yg akan datang '_'",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   */
  run: async (client, message, args) => {
    const user = message.member;
    const time = args[0];
    const remind = args.slice(1).join(" ");

    if (!time.endsWith("s") && !time.endsWith("m") && !time.endsWith("h"))
      return message.reply({
        embeds: [
          new MessageEmbed({
            color: "AQUA",
            description:
              "Pengunaan waktu salah, gunakan format s/m/h. contoh: !remind 5s reminder",
          }),
        ],
      });
    const msg = message.reply({
      embeds: [
        new MessageEmbed({
          color: "AQUA",
          author: {
            name: "REMINDER ADDED",
          },
          description: "Reminder kamu telah ditambah!",
          fields: [
            {
              name: "Time",
              value: time,
            },
            {
              name: "Reminder Message",
              value: remind,
            },
          ],
        }),
      ],
      allowedMentions: { repliedUser: false },
    });

    setTimeout(async () => {
      (await msg).delete();
      message.reply({
        embeds: [
          new MessageEmbed({
            color: "AQUA",
            description:
              "Hai kmu telah memasang reminder untuk dirimu sendiri!",
            fields: [
              {
                name: "Reminder Message",
                value: remind,
              },
            ],
          }),
        ],
        allowedMentions: { repliedUser: true },
      });
    }, ms(time));
  },
};
