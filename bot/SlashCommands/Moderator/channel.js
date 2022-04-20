const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "channel",
    description: "Manage channel",
    category: "Moderator",
    options: [
        {
            name: "edit-nama",
            description: "Edit nama channel",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel", 
                    description: "Berikan channel yg akan di ganti nama", 
                    type: "CHANNEL", 
                    required: true
                },
                {
                    name: "nama",
                    description: "Nama channel",
                    type: "STRING",
                }
            ],
        },
        {
            name: "remove",
            description: "Hapus channel",
            type: "SUB_COMMAND",
            options: [{name: "channel", description: "Berikan channel yg akan dihapus", type: "CHANNEL", required: true}]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        //error
        // error 
        const error = new MessageEmbed({
            color: "AQUA",
            title: "Moderator Commands",
            description: "Kamu tidak memiliki izin mengubah channel!",
            footer: {
                text: `${interaction.user.username}`,
                icon_url: `${interaction.member.displayAvatarURL({size: 1024, dynamic: true})}`
            }
        })
        // General embed
        const gen = new MessageEmbed({
            color: "AQUA",
            footer: {
                text: `Requested by ${interaction.user.username}`
            }
        })
        // Code
        const {options, member, guild, channel} = interaction;
        if(!member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({embeds: [error]})

        try {
            switch(options.getSubcommand()) {
                case "edit-nama":
                    const channel0 = interaction.options.getChannel("channel")
                    const newName = interaction.options.getString("nama")
                    await channel0.setName(`${newName}`)
                    const gen1 = gen.setDescription(`Channel telah diganti nama menjadi \`${newName}\``)
                    interaction.reply({embeds: [gen1]})
                    break;
                case "remove":
                    const channel = interaction.options.getChannel("channel")
                    const gen2 = gen.setDescription(`Channel \`${channel.name}\` Telah dihapus`)
                    await channel.delete()
                    interaction.reply({embeds: [gen2]})
            }
        } catch(Err) {
            const err = new MessageEmbed({
                color: "AQUA",
                title: "Moderator Commands",
                description: `${Err}`,
                footer: {
                    text: `${interaction.user.username}`,
                    icon_url: `${interaction.member.displayAvatarURL({size: 1024, dynamic: true})}`
                }
            })
    
            interaction.reply({embeds: [err]})
        }


    }
}