const { Client, Message, MessageEmbed } = require('discord.js');
const premSchema = require('../../Schema/premium');
const nekos = require('nekos.life');
const neko = new nekos();

module.exports = {
	name: 'kiss',
	category: 'Premium',
	aliases: [ '' ],
	description: 'Kisses',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
	run: async (client, message, args) => {
		let premUser;
		try {
			premUser = await premSchema.findOne({
				user_id: message.author.id
			});
			if (!premUser) {
				message.reply({ content: 'Kamu tidak bisa menggunakan command **Premium**' });
			} else {
				const image = await neko.sfw.kiss();
				message.reply({
					embeds: [
						new MessageEmbed({
							color: 'AQUA',
							author: {
								name: 'Premium command [Kiss]',
								icon_url: message.guild.iconURL({ dynamic: true })
							},
							image: {
								url: image.url
							},
							footer: {
								text: 'Requested by ' + message.member.displayName,
								icon_url: message.member.displayAvatarURL({ dynamic: true })
							}
						})
					],
					allowedMentions: { repliedUser: false }
				});
			}
		} catch (e) {
			message.reply({ content: 'Ada kesalahan dalam Database!' });
		}
	}
};
