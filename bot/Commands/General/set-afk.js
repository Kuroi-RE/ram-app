const { Client, Message, MessageEmbed } = require('discord.js');
// const afk = require('../../Structures/index');

module.exports = {
	name: 'set-afk',
	category: 'General',
	aliases: [ 'afk' ],
	description: 'AFK, jika ada yang tag kamu, kami akan memberitahu bahwa kamu afk!',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
	run: async (client, message, args) => {
		const reason = args.join(' ') || 'Tidak ada alasan.';
		client.afk.set(message.author.id, [ Date.now(), reason ]);
		try {
			message.reply({
				embeds: [
					new MessageEmbed({
						color: 'AQUA',
						description: `<a:verify:799539329235025923> Kamu sekarang afk! [\`${reason}\`]`
					})
				],
				allowedMentions: { repliedUser: true }
			});
		} catch (Err) {
			message.reply({ content: 'Error' });
		}
	}
};
