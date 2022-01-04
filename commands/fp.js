const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('freep')
		.setDescription('Get some free Points!'),
	async execute(interaction) {
		const sql = `SELECT * FROM WHERE userId = ${interaction.user.id}`
		console.log(sql);
		await interaction.reply({
			content: "Comando sendo desenvolvido...",
			ephemeral: true
		});
		await interaction.deleteReply();
	}
};