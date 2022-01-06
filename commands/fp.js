const { SlashCommandBuilder } = require('@discordjs/builders');
const { DocumentStore } = require('ravendb');
const store = new DocumentStore('http://192.168.0.16:8080', 'discbot');
store.initialize();
const session = store.openSession();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('Get some free Points!'),
	async execute(interaction) {
		let user = {
			id: interaction.user.id,
			name: interaction.user.username,
			idstr: interaction.user.id,
			avatarUrl: interaction.user.displayAvatarURL(),
			'@metadata': {
				'@collection': interaction.guildId.toString()
			}
		};
		await session.store(user, user.id);
		session.saveChanges();
	}
};