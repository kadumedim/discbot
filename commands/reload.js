const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reloadcmds")
        .setDescription("Reload all commands (admin only)"),
    async execute(interaction) {
        if(interaction.user.id != "229706675936821249") return interaction.reply({ content: 'No permissions to use this command!', ephemeral: true });
        try {
            for (const file of commandFiles) {
                delete require.cache[require.resolve(`./${file}`)];
                interaction.client.commands.delete(path.parse(file).name);

                const pull = require(`./${file}`);
                interaction.client.commands.set(path.parse(file).name, pull);
            }
            
        } catch (e) {
            return interaction.reply({ content: e, ephemeral: true });
        }
    }
};