const { Client } = require('discord.js');
const mongoose = require('mongoose');
const { db } = require('../../Schema/premium');
const { mongodb } = require('../../Structures/database/config.json');
// const testSchema = require('../../Schema/test');

module.exports = {
	name: 'ready',
	once: true,
	/**
     * 
     * @param {Client} client 
     */
	async execute(client) {
		const activityList = [ 'LarMoon 1.0.9', 'Sasskeeh', `/ to check my commands` ];

		// Interval
		// function bot() {
		// 	const activity = activityList[Math.floor(Math.random() * activityList.length)];
		// 	client.user.setActivity(activity, { type: 'PLAYING' });
		// }

		client.user.setPresence({
			activities: [ { name: 'Your Another Life | !help', type: 'PLAYING' } ],
			status: 'idle'
		});
		// setInterval(() => {
		// 	bot();
		// }, 12000);

		console.log('Connected to Discord');
	}
};
