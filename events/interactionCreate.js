const colors = require('colors');
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if(!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        console.log(colors.grey(`${interaction.user.tag} em #${interaction.channel.name} (${interaction.guild.name}) realizou o comando ${interaction.commandName}.`));

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (err) {
            if (err) console.log(colors.red(err));

            await interaction.reply({
                content: "Ocorreu um erro ao executar este comando.",
                ephemeral: true
            });
        }

    }
};