const colors = require('colors');
module.exports = {
    name: 'error',
    execute(client) {
        console.log(colors.red(`Discord client error '${err.code}' (${err.message}). Tentando reconexão em 10 segundos...`));
        setTimeout(() => { client.login(token); }, 10000);
    }
};