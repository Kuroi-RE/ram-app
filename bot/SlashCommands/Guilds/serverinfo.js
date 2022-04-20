const discord = require("discord.js");
const moment = require("moment")
require("../../Events/Client/ready");

module.exports = {
    name: "server-info",
    description: "Melihat informasi tentang server",
    permission: "ADMINISTRATOR",
    category: "General",
    /**
     * 
     * @param {discord.CommandInteraction} interaction
     * @param {discord.Client} client
     */

    async execute(interaction, client) {
        const guild = interaction.guild
        // Map
        const roleSiz = guild.roles.cache.size;
        const role = guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((r) => r)
            .slice(0, -1)
            .join(", ");
        const create = moment(guild.createdAt).format(
            "dddd, MMMM Do YYYY, HH:mm:ss"
        );
        // channel
        const t = guild.channels.cache.filter(t => t.type === "GUILD_TEXT").size;
        const v = guild.channels.cache.filter((v) => v.type === "GUILD_VOICE").size;
        

        const owner = interaction.guild.members.cache.get(`${guild.ownerId}`)
        const respon = new discord.MessageEmbed({
            title: `${guild.name} Information`,
            color: "AQUA",
            description: `Informasi tentang server:`,
            fields: [
                {
                    name: "Server ID",
                    value: `\`${guild.id}\``,
                    inline: true
                },
                {
                    name: "Server Created",
                    value: `${create}`,
                    inline: true
                },
                {
                    name: "Owner | ID",
                    value: `${owner.nickname} | ${owner.id}`,
                    inline: true
                },
                {
                    name: "Members Count",
                    value: `${guild.members.cache.size} People`,
                    inline: false
                },
                {
                    name: "Roles Count",
                    value: `${roleSiz} Roles`,
                    inline: true
                }, 
                {
                    name: "Channels Count",
                    value: `<:emo1:949739094701928478> ${v} | <:emo2:949739094899036201> ${t}`,
                    inline: true
                }
            ],
            timestamp: new Date(),
            footer: {
                text: "Requested by " + interaction.member.nickname 
            }
            
        })
        interaction.reply({embeds: [respon]})
    }
}