#!/usr/bin/env node
const fs = require('fs');
const utils = require('./utils');
const path = require('path');
const log = require('./log');

const cwd = process.cwd();
const [, , ...args] = process.argv;
const templateUrl = path.resolve(__dirname, 'template');

const package = require('./package.json');

function init() {
    if (args.length === 0) {
        log.blue(`you can use:\n rollup-cli2 create \nrollup-cli2 init \nrollup-cli2 -v`);
        return;
    }
    const ignoreInput = path.resolve(__dirname, 'ignore.txt');
    if (args[0] === 'init') {
        const dir = fs.readdirSync(cwd);
        if (dir.length !== 0) {
            log.red(`rollup-cli2 init: this dir is not empty`);
            return;
        }
        utils.copyFile(templateUrl, cwd, { exclude: 'node_modules' });
        const ignoreOutput = path.resolve(cwd, '.gitignore');
        fs.copyFileSync(ignoreInput, ignoreOutput);
        log.boldGreen('you rollup template init finish');
    }
    if (args[0] === 'create') {
        const name = args[1];
        if (!name) {
            log.red(`rollup-cli2 create: rollup-cli2 create [name]`);
            return;
        }
        const toPath = path.resolve(cwd, name);
        if (fs.existsSync(toPath)) {
            log.red(`rollup-cli2 create: ${name} dir is exit`);
            return;
        }
        fs.mkdirSync(toPath);
        utils.copyFile(templateUrl, toPath, { exclude: 'node_modules' });
        const ignoreOutput = path.resolve(toPath, '.gitignore');
        fs.copyFileSync(ignoreInput, ignoreOutput);

        log.green('you rollup template init finish');
    }
    if (args[0] === '-v') {
        log.blue(`rollup-cli2 version: ${package.version}`);
    }
}

init();
