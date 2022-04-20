const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../Structures/database/config.json');
const { join } = require('node:path');
const { createReadStream } = require('node:fs');
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	VoiceConnectionStatus,
	AudioPlayerStatus,
	StreamType
} = require('@discordjs/voice');

module.exports = {
	name: 'join',
	category: 'Developer',
	aliases: [ '' ],
	description: 'Joined channel',
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

		if (!channel)
			return message.reply({ content: 'Tidak berada dalam channel', allowedMentions: { repliedUser: false } });
		if (channel.type == 'GUILD_STAGE_VOICE') {
			if (!channel.permissionsFor(message.client.user).has('CONNECT'))
				return message.reply({
					content: 'Tidak dapat bergabung ke dalam channel',
					allowedMentions: { repliedUser: false }
				});
			if (!channel.permissionsFor(message.client.user).has('SPEAK'))
				return message.reply({
					content: 'Tidak dapat bergabung ke dalam channel',
					allowedMentions: { repliedUser: false }
				});
			// handling player
			const player = createAudioPlayer();
			const connection = await joinVoiceChannel({
				channelId: channel.id,
				guildId: message.guild.id,
				adapterCreator: message.guild.voiceAdapterCreator
			});
			connection.on(VoiceConnectionStatus.Ready, () => {
				connection.subscribe(player);
				message.channel.send({ content: `Joined to **${channel.name}**` });

				message.guild.me.voice.setRequestToSpeak(true);
				let song = createAudioResource(join(__dirname, '..', '..', 'Util', 'song', 'music2.mp3'));
				player.play(song);
				message.channel.send({ content: `Playing audio from local files!` });
				player.on(AudioPlayerStatus.Idle, () => {
					message.channel.send({ content: 'Ended song' });
					connection.destroy();
				});
			});
		}
	}
};
