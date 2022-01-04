const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const colors = require('colors');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
    registerCommands: function () {
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(token);

        /*
        COMANDOS GLOBAIS
        rest.put(Routes.applicationCommands(clientId), { body: commands })
            .then(() => console.log(colors.green('Comandos registrados.')))
            .catch(console.error);*/

        /* 
        COMANDOS LOCAIS
        */
        rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
            .then(() => console.log(colors.green('Comandos registrados.')))
            .catch(console.error);
    }
};