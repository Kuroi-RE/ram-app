const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'activity',
	aliases: [ 'act' ],
	category: 'General',
	description: 'Lihat aktifitas/presence dari user!',
	/**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   */
	run: async (client, message, args) => {
		const user =
			message.mentions.members.first() ||
			message.guild.members.cache.find(
				(r) => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()
			) ||
			message.guild.members.cache.find(
				(ro) => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()
			) ||
			message.member;

		try {
			user.presence.activities.forEach((activity) => {
				if (activity.type === 'CUSTOM_STATUS') {
					const embed = new MessageEmbed({
						author: {
							name: user.displayName,
							icon_url: user.displayAvatarURL({ dynamic: true })
						},
						color: 'AQUA',
						fields: [
							{
								name: 'Status',
								value: `Custom Status - ${activity.emoji || 'No Emoji'} | ${activity.state}`
							}
						],
						thumbnail: {
							url: user.displayAvatarURL({ dynamic: true })
						},
						footer: {
							text: message.guild.name,
							icon_url: message.guild.iconURL()
						},
						timestamp: new Date()
					});
					message.reply({
						embeds: [ embed ],
						allowedMentions: { repliedUser: false }
					});
				} else if (activity.type === 'PLAYING') {
					let name1 = activity.name;
					let details1 = activity.details;
					let state1 = activity.state;
					let start = moment(message.member.presence.activities[0].timestamps.start).format(
						'dddd, MMMM Do YYYY, HH:mm:ss'
					);
					let timestamp = moment(message.member.presence.activities[0].timestamps.start).fromNow();
					let image = user.user.displayAvatarURL({ dynamic: true });

					const sembed = new MessageEmbed({
						color: 'AQUA',
						author: {
							name: user.displayName + "'s Activity"
						},
						thumbnail: {
							url: image
						},
						fields: [
							{
								name: 'Type',
								value: 'Playing'
							},
							{
								name: 'App',
								value: `${name1}`
							},
							{
								name: 'Details',
								value: `${details1 || 'Tidak ada details.'}`
							},
							{
								name: 'Working on',
								value: `${state1 || 'Idle'} `
							},
							{
								name: 'Start On',
								value: `${start}`
							},
							{
								name: 'Time',
								value: `${timestamp}`
							}
						]
					});
					message.reply({
						embeds: [ sembed ],
						allowedMentions: { repliedUser: false }
					});
				} else if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {
					let trackIMG = `https://i.scdn.co/image/${user.presence.activities[0].assets.largeImage.slice(8)}`;
					let trackURL = `https://open.spotify.com/track/${user.presence.activities[0].syncID}`;
					let trackName = user.presence.activities[0].details;
					let trackAuthor = user.presence.activities[0].state;
					let trackAlbum = user.presence.activities[0].assets.largeText;

					const row = new MessageActionRow().addComponents(
						new MessageButton().setLabel('Hear This Song').setStyle('LINK').setURL(trackURL)
					);
					const embed = new MessageEmbed({
						color: 'GREEN',
						author: {
							name: 'Spotify Track Info',
							icon_url: 'https://cdn.discordapp.com/emojis/653135129870336031.png?v=1'
						},
						thumbnail: {
							url: trackIMG
						},
						fields: [
							{
								name: 'Song Name',
								value: trackName,
								inline: true
							},
							{
								name: 'Album',
								value: trackAlbum,
								inline: true
							},
							{
								name: 'Author',
								value: trackAuthor,
								inline: false
							}
						],
						footer: {
							text: `${user.displayName} Spotify status`,
							icon_url: `${user.displayAvatarURL({ dynamic: true })}`
						}
					});

					message.reply({
						components: [ row ],
						embeds: [ embed ],
						allowedMentions: { repliedUser: false }
					});
				}
			});
		} catch (Err) {
			message.reply({
				embeds: [
					new MessageEmbed({
						color: 'AQUA',
						description: 'Tidak ditemukan aktifitas pada profile user!'
					})
				],
				allowedMentions: { repliedUser: false }
			});
		}
	}
};
