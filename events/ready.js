const colors = require('colors');
module.exports = {
    name: 'ready',
    once: true, 
    execute(client) { 
        console.log(colors.cyan('Bot carregado!'))
    }
};