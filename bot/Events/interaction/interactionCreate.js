const { Client, CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("Ada masalah saat melakukan perintah ini.")
            ]}) && client.commands.delete(interaction.commandName);
            try {
                command.execute(interaction, client)
            } catch (Err) {
                interaction.reply({embeds: [
                    new MessageEmbed({
                        color: "AQUA",
                        description: "Ada masalah saat mengekseskui perintah!"
                    })
                ]})
            }
        }
    }
}