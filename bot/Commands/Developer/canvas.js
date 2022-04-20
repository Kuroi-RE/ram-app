const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
module.exports = {
	name: 'canvas',
	category: 'None',
	aliases: [ 'can' ],
	description: 'None',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
	run: async (client, message, args) => {
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');

		//* Settings  */
		ctx.strokeStyle = '#00FFFF';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		ctx.fillText(message.member.displayName, 80, 0, 250, 250);

		const bg = await Canvas.loadImage(
			'https://media.discordapp.net/attachments/811050641589665813/950029307403714650/love-romantic-background-with-flowers-heart-shape_3589-929.png'
		);
		ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

		const pfp = await Canvas.loadImage(message.member.displayAvatarURL({ dynamic: true }));
		ctx.drawImage(pfp, 25, 25, 200, 200);

		const attachments = new MessageAttachment(canvas.toBuffer(), 'welcome.png');
		message.reply({ files: [ attachments ] });
	}
};
