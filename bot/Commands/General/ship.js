const { CommandInteraction, Client, MessageEmbed, Message, MessageAttachment} = require("discord.js");
const Canvas = require("canvas");

module.exports = {
    name: "ship",
    aliases: ["love"],
    description: "Kecocokan hati anjas",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
     run: async(client, message, args) => {
        // error mesg
        const error = new MessageEmbed({
            color: "AQUA"
        })

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");
        Canvas.registerFont("./Util/font/Oswald-VariableFont_wght.ttf", {family: "Comic Sans"})
        const t = args[0]
        const target = message.mentions.members.first() ||
        message.guild.members.cache.find(
          (r) =>
            r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          (ro) =>
            ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
        );

        const er = error.setDescription("User tidak ditemukan!")
        if(!target) return message.channel.send({embeds: [er]})
        if(target.id == message.author.id) return message.channel.send({embeds: [new MessageEmbed({
            color: "AQUA",
            description: "LOL DEK, jan tag diri sendiri!"
        })]})

        const bg = await Canvas.loadImage("https://media.discordapp.net/attachments/811050641589665813/950029307403714650/love-romantic-background-with-flowers-heart-shape_3589-929.png");
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: "png"}))
        ctx.drawImage(avatar, 50, 25, 200, 200)

        const Tavatar = await Canvas.loadImage(target.displayAvatarURL({format: "png"}))
        ctx.drawImage(Tavatar, 450, 25, 200, 200)

        const heart = await Canvas.loadImage("https://media.discordapp.net/attachments/811050641589665813/950031706256179280/heart.png?width=456&height=456")
        const random = Math.floor(Math.random() * 99) + 1
        const rndm = `${random}%`

        ctx.font = '35px "Comic Sans"'
        

        if(random >= 50) {
            ctx.drawImage(heart, 255, 25, 190, 190)
            ctx.fillText(rndm, 330, 120, 100, 25)
            const attachments = new MessageAttachment(canvas.toBuffer(), "love.png")
            message.channel.send({files: [attachments], content: "Cieeee dekk dekk"})
        } else {
            ctx.drawImage(heart, 255, 25, 190, 190)
            ctx.fillText(rndm, 330, 120, 100, 25)
            const attachments = new MessageAttachment(canvas.toBuffer(), "love.png")
            message.channel.send({files: [attachments], content: "Mundur DEKK"})
        }

    }
}