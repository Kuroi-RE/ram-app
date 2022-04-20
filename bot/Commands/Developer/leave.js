const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../Structures/database/config.json');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	name: 'leave',
	category: 'Developer',
	aliases: [ '' ],
	description: 'Leave channel',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
	run: async (client, message, args) => {
		if (!message.member.id === config.dev)
			return message.reply({ content: 'Kamu bukan developer!', allowedMentions: { repliedUser: false } });

		const channel = message.member.voice.channel;

		const connection = getVoiceConnection(message.guild.id);
		if (!connection) return message.channel.send({ content: `Saya tidak berada didalam saluran apapun!` });

		try {
			await connection.destroy();
			message.channel.send({ content: `Joined to **${channel.name}**` });
		} catch (Err) {
			message.reply({
				content: 'Error!\n' + `\`\`\`${Err}\`\`\``,
				allowedMentions: { repliedUser: false }
			});
		}
	}
};
