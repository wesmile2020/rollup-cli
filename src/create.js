const path = require('path');
const fs = require('fs');
const ora = require('ora');

const question = require('./question');
const config = require('./config');
const FSUtils = require('./FSUtils');
const log = require('./log');
const downGit = require('./downGit');

async function create(cwd, name) {
    const spinner = ora({
        text: 'downloading...',
    });

    let projectName = name;
    let description = '';
    try {
        const answer = await question(projectName, {
            projectName: (value) => {
                const target = path.resolve(cwd, value);
                if (fs.existsSync(target)) {
                    return `rc-cli2 create: this dir ${value} is exited`;
                }
                return true;
            }
        });
        projectName = answer.projectName;
        description = answer.description;
    } catch (error) {
        log.error('rc-cli2 create error:', error.message);
    }
    const target = path.resolve(cwd, projectName);
    fs.mkdirSync(target);
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

module.exports = create;
