const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Client,
  CommandInteraction,
} = require("discord.js");

module.exports = {
  name: "link-server",
  description: "Link server",
  category: "Guild",
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("YourAnotherLife")
        .setStyle("LINK")
        .setURL("https://discord.gg/mH6zEM7")
    );
    let embed = new MessageEmbed({
      color: "AQUA",
      description: `Requested by ${interaction.user.username}`,
    });

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
