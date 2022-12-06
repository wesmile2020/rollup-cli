#!/usr/bin/env node

const package = require('../package.json');
const log = require('./log');
const init = require('./init');
const create = require('./create');

const cwd = process.cwd();
const [, , ...args] = process.argv;

function setup() {
    const [type, name] = args;
    switch (type) {
        case 'init': {
            init(cwd);
            break;
        }

        case 'create': {
            create(cwd, name);
            break;
        }

        case '-v': {
            log.info(`rc-cli2: version ${package.version}`);
            break;
        }

        default: {
            console.log(`you can use:\nrc-cli2 create \nrc-cli2 init \nrc-cli2 -v`);
            break;
        }
    }
}

setup();
