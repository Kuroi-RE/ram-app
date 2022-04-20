const { Client, Message, MessageEmbed, User } = require('discord.js');
const premSchema = require('../../Schema/premium');
const config = require('../../Structures/database/config.json');

module.exports = {
	name: 'add-premium',
	category: 'Premium',
	aliases: [ 'addprem' ],
	description: 'Premium account',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
	run: async (client, message, args) => {
		if (!message.member.id === config.dev)
			return message.reply({ content: 'This command just available for Developer' });
		const user_id = args[0];

		await new premSchema({
			user_id: user_id
		}).save();

		message.reply({
			content: `<@${user_id}> Kamu sekarang telah menjadi Premium member.\nDitambahkan oleh: ${message.author
				.username}`
		});
	}
};
