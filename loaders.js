const fs = require('fs');
const colors = require('colors');
const { Collection } = require('discord.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

module.exports = {
    /**
    * Carrega os comandos de um diretório
    * 
    * @param {string} dir - O diretório
    */
    loadCommands: function (dir, client) {
        client.commands = new Collection();
        let nFiles = 0;
        for (const file of commandFiles) {
            const command = require(dir + `${file}`);
            client.commands.set(command.data.name, command);
            console.log(colors.yellow('[Command] ' + file + ' ✅'))
            nFiles++;
        }
        console.log(colors.yellow("Total de " + nFiles + " comandos carregados!"));
    },

    /**
     * Carrega os eventos de um diretório
     * 
     * @param {string} dir - O diretório
     */
    loadEvents: function (dir, client) {
        let nFiles = 0;
        for (const file of eventFiles) {
            const event = require(dir + `${file}`);
            console.log(colors.yellow('[Event] ' + file + ' ✅'))
            nFiles++;
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
        console.log(colors.yellow("Total de " + nFiles + " eventos carregados!"));
    }
}