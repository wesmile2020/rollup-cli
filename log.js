const colors = require('colors');

function green(...msg) {
    console.log(colors.green(...msg))
}

function boldGreen(...msg) {
    console.log(colors.bold(colors.green(...msg)));
}

function red(...msg) {
    console.log(colors.red(...msg));
}

function boldRed(...msg) {
    console.log(colors.bold(colors.bold(...msg)));
}


function blue(...msg) {
    console.log(colors.blue(...msg));
}

function boldBlue(...msg) {
    console.log(colors.bold(colors.blue(...msg)))
}

module.exports = {
    green,
    red,
    boldGreen,
    boldRed,
    blue,
    boldBlue,
};
