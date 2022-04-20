const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const cooldown = new Set();

module.exports = {
    name: "kick",
    category: "Moderator",
    description: "Mengeluarkan member dari server",
    options: [
    {
        name: "user",
        description: "Mengeluarkan member",
        type: "USER",
        required: true,
        option: [{name: "user", description: "Tag member yg akan dikick", type: "USER", required: true}],
    },
    {
        name: "reason",
        description: "Alasan mengeluarkan member",
        type: "STRING",
        required: true,
        option: [{name: "reason", description: "Berikan alasan", type: "STRING", required: true}],
    }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
    async execute(interaction, client) {
        // add cooldown
        if(cooldown.has(interaction.member.id)) {
            interaction.reply({content: `Kamu tidak bisa mengeluarkan member secara terus menerus, tunggu selama 15menit lagi`})
        }
        // error 
        const error = new MessageEmbed({
            color: "AQUA",
            title: "Moderator Commands",
            footer: {
                text: `${interaction.user.username}`,
                icon_url: `${interaction.member.displayAvatarURL({size: 1024, dynamic: true})}`
            }
        })
        if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply("Kamu tidak memiliki izin!");
        const user = interaction.options.getUser("user")
        if(!user) return interaction.reply({content: "Member tidak boleh kosong!"})
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})
        if(!member) return interaction.reply({embeds: [error.setDescription("Tidak dapat menemukan member!")]})
        const reason = interaction.options.getString('reason')

        if(!member.kickable || member.user.id === client.user.id) return interaction.reply({embeds: [error.setDescription("Tidak dapat mengeluarkan member.")]})
        if(interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.reply({embeds: [error.setDescription("Member tersebut melebihi jabatanmu, tidak dapat dikeluarkan!")]})

        const embed = new MessageEmbed({
            color: "AQUA",
            description: `${member.displayName} Telah dikeluarkan dari Server dengan alasan: ${reason}`
        })
        await member.user.send(`You are kicked from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => {})
        await member.kick({ reason })
        interaction.reply({ embeds: [ embed ]})

        cooldown.add(message.author.id);
        setTimeout(() => {
             cooldown.delete(message.author.id)
         }, 900000); //10 sec = 10000
    }   
}