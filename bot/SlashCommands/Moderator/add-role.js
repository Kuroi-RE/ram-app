const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const cooldown = new Set();

module.exports = {
	name: 'add-role',
	category: 'Moderator',
	description: 'Memberikan roles kepada member.',
	options: [
		{
			name: 'member',
			description: 'Siapa member yg akan diberikan roles?',
			type: 'USER',
			required: true
		},
		{
			name: 'role',
			description: 'Role yang akan diberikan',
			type: 'ROLE',
			required: true
		}
	],
	/**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @returns 
     */
	async execute(interaction, client) {
		if (!interaction.member.permissions.has('MANAGE_ROLES'))
			return interaction.reply({
				embeds: [
					new MessageEmbed({
						color: 'AQUA',
						author: {
							name: interaction.member.user.username,
							icon_url: interaction.member.displayAvatarURL({ dynamic: true })
						},
						description: 'Tidak dapat memberikan role! kamu bukan moderator'
					})
				]
			});

		const user = interaction.options.getMember('member');
		const role = interaction.options.getRole('role');
		try {
			user.roles.add(role);
			interaction.reply({
				embeds: [
					new MessageEmbed({
						color: 'AQUA',
						author: {
							name: 'Moderator [AddRole] SUCCES',
							icon_url: interaction.guild.iconURL({ dynamic: true })
						},
						description: `${role.name} Telah ditambahkan ke user!`
					})
				],
				allowedMentions: { repliedUser: false }
			});
		} catch (Err) {
			interaction.reply({
				embeds: [
					new MessageEmbed({
						color: 'AQUA',
						author: {
							name: 'Moderator [AddRole] Failed',
							icon_url: interaction.guild.iconURL({ dynamic: true })
						},
						description: `Tidak dapat menambahkan role, ada error!`
					})
				],
				allowedMentions: { repliedUser: false }
			});
		}
	}
};
