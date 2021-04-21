const chalk = require('chalk');

function error(...rest) {
    console.log(chalk.red(...rest));
}

function info(...rest) {
    console.log(chalk.cyan(...rest));
}

function success(...rest) {
    console.log(chalk.green(...rest));
}

module.exports = {
    error,
    info,
    success,
}
