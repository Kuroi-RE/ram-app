const {Client, Message, MessageEmbed} = require("discord.js");

module.exports = {
    name: "ping",
    category: "General",
    description: "Shows ping latecy",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        const msg = await message.channel.send("Pinging..")
        const embed = new MessageEmbed({
            color: "AQUA",
            description: `PING: \`${client.ws.ping}ms\`\nLatency: \`${Math.floor(msg.createdAt - message.createdAt)}ms\``
        })
        await message.channel.send({embeds: [embed]})
        msg.delete()
    }
}