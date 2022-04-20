const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Hapus pesan",
  category: "Moderator",
  options: [
    {
      name: "number",
      description: "Brapa pesan yg akan dihapus? max: 99",
      type: "NUMBER",
      required: true,
    },
  ],

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.member.permissions.has("MANAGE_MESSAGES"))
      return interaction.reply({ content: "Kamu bukan moderator!" });
    const num = interaction.options.getNumber("number");
    try {
      const { size } = await interaction.channel.bulkDelete(num, true);
      interaction.reply({
        embeds: [
          new MessageEmbed({
            color: "AQUA",
            description: `Menghapus ${size} pesan.`,
            footer: {
              text: `Oleh: ${interaction.member.displayName}`,
              icon_url: interaction.member.displayAvatarURL(),
            },
          }),
        ],
        allowedMentions: { repliedUser: true },
      });
    } catch (Err) {
      interaction.reply({
        embeds: [
          new MessageEmbed({
            color: "ORANGE",
            author: { name: "WARNING" },
            description: Err,
          }),
        ],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
