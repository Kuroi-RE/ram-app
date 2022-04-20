const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const cooldown = new Set();

module.exports = {
	name: 'remove-role',
	category: 'Moderator',
	description: 'Menghapus roles dari member.',
	options: [
		{
			name: 'member',
			description: 'Siapa member yg akan dihapus rolenya?',
			type: 'USER',
			required: true
		},
		{
			name: 'role',
			description: 'Role yang akan dihapus',
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
			user.roles.remove(role);
			interaction.reply({
				embeds: [
					new MessageEmbed({
						color: 'AQUA',
						author: {
							name: 'Moderator [RemoveRole] SUCCES',
							icon_url: interaction.guild.iconURL({ dynamic: true })
						},
						description: `${role.name} Telah dihapus dari user!`
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
						description: `Tidak dapat menghapus role dari user, ada error!`
					})
				],
				allowedMentions: { repliedUser: false }
			});
		}
	}
};
