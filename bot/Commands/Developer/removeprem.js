const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../Structures/database/config.json');
const premSchema = require('../../Schema/premium');

module.exports = {
	name: 'remove-premium',
	category: 'Premium',
	aliases: [ 'removeprem' ],
	description: 'Hapus premium [Developer only]',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
	run: async (client, message, args) => {
		if (!message.member.id === config.dev)
			return message.reply({ content: 'This command just available for Developer' });
		const user_id = args[0];
		if (!user_id) return message.reply({ content: 'Missing ID' });
		await premSchema
			.findOneAndDelete({
				user_id: user_id
			})
			.then(() => {
				message.reply({ content: 'Berhasil menghapus premium user!' });
			});
	}
};
