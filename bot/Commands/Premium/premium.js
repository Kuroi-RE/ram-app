const { Client, Message, MessageEmbed, User } = require('discord.js');
const premSchema = require('../../Schema/premium');
module.exports = {
	name: 'premium',
	category: 'Premium',
	aliases: [ 'prem' ],
	description: 'Premium account',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
	run: async (client, message, args) => {
		if (!message.member.roles.cache.get('745530997105229855')) {
			message.reply({ content: 'Kamu tidak bisa claim **premium**!' });
		} else {
			const user = message.member;

			await new premSchema({
				user_id: user.id
			}).save();

			message.reply({ content: 'Kamu sekarang adalah member premium!' });
		}
	}
};
