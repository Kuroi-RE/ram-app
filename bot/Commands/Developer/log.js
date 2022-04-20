const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../Structures/database/config.json');
var logSchema = require('../../Schema/changelog');
const mongoose = require('mongoose');

module.exports = {
	name: 'log',
	category: '',
	aliases: [ '' ],
	description: 'Change log for larmoon',
	/**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} args 
     */
	run: async (client, message, args) => {
		if (!message.member.id === config.dev) return;
	}
};
