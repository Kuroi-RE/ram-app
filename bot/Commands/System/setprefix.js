const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'set-prefix',
	category: 'System',
	aliases: [ 'sp', 'prefix' ],
	description: 'Ubah prefix bot',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
	run: async (client, message, args) => {
		if (!message.member.permissions.has('ADMINISTRATOR'))
			return message.reply({ content: 'Lu bukan admin, jadi gabisa ubah prefix' });
		const newPrefix = args[0];
		const nowPrefix = await db.fetch(`prefix_${message.guild.id}`);
		if (!newPrefix)
			return message.reply({
				content: 'Prefix sekarang adalah: ' + nowPrefix + '\nUntuk mengganti prefix: !set-prefix [newprefix]'
			});
		if (newPrefix.length > 3) return message.reply({ content: 'Prefix terlalu panjang!' });
		try {
			await db.set(`prefix_${message.guild.id}`, newPrefix);
			message.reply({ content: '✔️ Prefix set to ' + newPrefix });
		} catch (Err) {
			message.reply({ content: 'Ada kesalahan saat mengganti prefix!\n' + Err });
		}
	}
};
