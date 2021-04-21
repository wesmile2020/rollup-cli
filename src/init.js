const path = require('path');
const fs = require('fs');
const ora = require('ora');

const question = require('./question');
const config = require('./config');
const FSUtils = require('./FSUtils');
const log = require('./log');
const downGit = require('./downGit');

async function init(target) {
    const spinner = ora({
        text: 'downloading...',
    });
    let projectName = FSUtils.getFileName(target);

    const dir = fs.readdirSync(target);
    if (dir.length !== 0) {
        log.error(`rc-cli2 init: this dir ${projectName} is not empty`);
        return
    }
    let description = '';
    try {
        const answer = await question(projectName);
        projectName = answer.projectName;
        description = answer.description;
    } catch (error) {
        log.error('rc-cli2 init error:', error.message);
    }
    spinner.start();

    try {
        await downGit(config.templateUrl, target);
        FSUtils.delFile(path.resolve(target, '.git'));
        const nextObj = {
            name: projectName,
            description,
        };
        FSUtils.updateJson(path.resolve(target, 'package.json'), nextObj);
        FSUtils.updateJson(path.resolve(target, 'package-lock.json'), nextObj);

        spinner.succeed('> Your project create success');
    } catch (error) {
        spinner.fail('failed:', error.message);
    }
}

module.exports = init;
