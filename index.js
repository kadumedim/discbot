const colors = require('colors');
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const deploy = require('./deploy-commands.js');
const loaders = require('./loaders.js');

/**
 * Inicializa o bot
 */
function start() {
	console.log(colors.cyan('Carregando Comandos....'));
	loaders.loadCommands('./commands/', client);
	console.log(colors.cyan('Carregando Eventos....'));
	loaders.loadEvents('./events/', client);
	console.log(colors.cyan('Registrando Comandos....'));
	deploy.registerCommands();

	console.log(colors.cyan('Conectando...'));
	client.login(token).catch(err => {
		console.log(colors.red('Não foi possível logar-se no Discord.'));
		console.log(err);
		return;
	});
}
start();