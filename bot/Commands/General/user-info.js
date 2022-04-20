const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');
const premSchema = require('../../Schema/premium');

module.exports = {
	name: 'user-info',
	category: 'General',
	aliases: [ 'user' ],
	description: 'Lihat informasimu / user lain',
	/**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {*} args
   */
	run: async (client, message, args) => {
		const trimArray = (arr, maxLen = 10) => {
			if (arr.length > maxLen) {
				const len = arr.length - maxLen;
				arr = arr.slice(0, maxLen);
				arr.push(` And ${len} more roles...`);
			}
			return arr;
		};

		const BADGES = {
			DISCORD_EMPLOYEE: `<:B_DiscordStaff:724998896975216741>`,
			DISCORD_PARTNER: '<:B_DiscordPartner:785508307451772959>',
			BUGHUNTER_LEVEL_1: '<:B_BugHunter:785509602112045156>',
			HYPESQUAD_EVENTS: '<:B_HypesquadEvents:785509602359509053>',
			HOUSE_BRAVERY: '<:B_Bravery:785509029794414624>',
			HOUSE_BRILLIANCE: '<:B_Brilliance:785509030134677545>',
			HOUSE_BALANCE: `<:B_Balance:785509029732417576>`,
			EARLY_SUPPORTER: '<:B_Supporter:785509602925346816>',
			VERIFIED_BOT: '<:B_BotTag:785508306303189034>',
			VERIFIED_DEVELOPER: '<:B_DiscordDev:724998896966959195>'
		};
		const mmbr =
			message.mentions.members.first() ||
			message.guild.members.cache.find(
				(r) => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()
			) ||
			message.guild.members.cache.find(
				(ro) => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()
			) ||
			message.member;

		let isPremium;
		let data = await premSchema.findOne({
			user_id: mmbr.id
		});

		if (data) {
			isPremium = true;
		} else {
			isPremium = false;
		}

		let userFlags;
		if (mmbr.user.flags === null) {
			userFlags = '';
		} else {
			userFlags = mmbr.user.flags.toArray();
		}
		const role = mmbr.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((role) => role.toString())
			.slice(0, -1);
		const roleCount = mmbr.roles.cache.size - 1;
		const joinedServer = moment.utc(mmbr.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss');
		const joined = moment.utc(mmbr.user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss');

		const embed = new MessageEmbed({
			color: 'AQUA',
			author: {
				name: mmbr.displayName + ' Information',
				icon_url: mmbr.displayAvatarURL({ dynamic: true })
			},
			footer: {
				text: `Request by ${message.member.displayName}`,
				icon_url: message.member.displayAvatarURL({ dynamic: true })
			},
			timestamp: new Date(),
			fields: [
				{
					name: 'User ID',
					value: mmbr.id,
					inline: true
				},
				{
					name: 'Discriminator',
					value: mmbr.user.discriminator,
					inline: true
				},
				{
					name: 'Badge',
					value: userFlags.length ? userFlags.map((flag) => BADGES[flag]).join(', ') : 'No Badge',
					inline: false
				},
				{
					name: 'Joined Server',
					value: joinedServer,
					inline: true
				},
				{
					name: 'Account Create',
					value: joined,
					inline: true
				},
				{
					name: 'Premium user?',
					value: `${isPremium}`,
					inline: true
				},
				{
					name: 'Roles',
					value: `(${roleCount}) ${role.length < 10
						? role.join(', ')
						: role.length > 10 ? trimArray(role) : 'No Roles'}`,
					inline: false
				}
			]
		});
		message.channel.sendTyping();
		await message.channel.send({ embeds: [ embed ] });
	}
};
