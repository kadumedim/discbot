const Discord = require("discord.js");
const config = require('./config.json');
const logger = require('npmlog');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"]});

client.login(config.credentias.token).catch (error => {logger.error('error', error)});
