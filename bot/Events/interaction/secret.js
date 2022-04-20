const { Client, CommandInteraction, MessageEmbed, Message } = require('discord.js');
// const afk = require('../../Structures/index');
const moment = require('moment');
const Schema = require('../../Schema/changelog');

module.exports = {
	name: 'messageCreate',
	/**
     * 
     * @param {Message} message
     * @param {Client} client
     */
	async execute(message, client) {
		if (!message.guild || message.author.bot) return;
		let prefix = '!';
		if (message.content.startsWith(prefix)) {
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			if (!message.content.length) return message.reply({ content: 'Please add new changelog' });
			await new Schema({
				change_log: args.slice(1).join(' '),
				time: new Date(),
				id_ch: 'larmoon'
			}).save();
		}
	}
};
