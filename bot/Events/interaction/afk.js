const { Client, CommandInteraction, MessageEmbed, Message } = require('discord.js');
// const afk = require('../../Structures/index');
const moment = require('moment');

module.exports = {
	name: 'messageCreate',
	/**
     * 
     * @param {Message} message
     * @param {Client} client
     */
	async execute(message, client) {
		if (!message.guild || message.author.bot) return;
		if (!message.guild.me.permissions.has('CHANGE_NICKNAME'))
			return message.reply({ content: 'Saya tidak memiliki ijin untuk menganti nama!' });

		const mentionMemb = message.mentions.members.first();
		if (mentionMemb) {
			const data = client.afk.get(mentionMemb.id);

			if (data) {
				const [ timestamp, reason ] = data;
				const time = moment(timestamp).fromNow();

				message.reply({
					embeds: [
						new MessageEmbed({
							color: 'AQUA',
							description: `${mentionMemb} sedang afk ${time}. [${reason}]`
						})
					]
				});
			}
		}
		const userData = client.afk.get(message.member.id);
		if (userData) {
			client.afk.delete(message.author.id);
			message.reply({ content: `Welcome back! ${message.author}`, allowedMentions: { repliedUser: true } });
		}
	}
};
