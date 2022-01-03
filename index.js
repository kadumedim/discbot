const colors = require('colors');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const deploy = require('./deploy-commands.js')


/**
 * Inicializa o bot
 */
function start() {
	console.log(colors.cyan('Carregando Comandos....'));
	loadCommands('./commands/');
	console.log(colors.cyan('Carregando Eventos....'));
	loadEvents('./events/');
	console.log(colors.cyan('Registrando Comandos....'));
	deploy.registerCommands();

	console.log(colors.cyan('Conectando o Bot...'));
	client.login(token).catch(err => {
		console.log(colors.red('Não foi possível logar-se no Discord.'));
		console.log(err);
	});
}

/**
 * Carrega os comandos de um diretório
 * 
 * @param {string} dir - O diretório
 */
function loadCommands(dir) {
	client.commands = new Collection();
	const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
	let nFiles = 0;
	for (const file of commandFiles) {
		const command = require(dir + `${file}`);
		client.commands.set(command.data.name, command);
		console.log(colors.yellow('[Command] ' + file + ' carregado!'))
		nFiles++;
	}
	console.log(colors.yellow("Total de " + nFiles + " comandos carregados!"));
}

/**
 * Carrega os eventos de um diretório
 * 
 * @param {string} dir - O diretório
 */
function loadEvents(dir) {
	const eventFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
	let nFiles = 0;
	for (const file of eventFiles) {
		const event = require(dir + `${file}`);
		console.log(colors.yellow('[Event] ' + file + ' carregado!'))
		nFiles++;
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
	console.log(colors.yellow("Total de " + nFiles + " eventos carregados!"));
}
/** 
 * Aciona a função de inicializar o bot
*/
start();