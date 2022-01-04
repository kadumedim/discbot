const colors = require('colors');
module.exports = {
    name: 'ready',
    once: true, 
    execute(client) { 
        client.user.setActivity(`${client.guilds.cache.size} servers`, {type : "PLAYING"});
        console.log(colors.cyan(`🔵 - ${client.user.username} (${client.users.cache.size} Usuários, ${client.guilds.cache.size} Servidores)`))
    }
};