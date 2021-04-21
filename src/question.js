const inquirer = require('inquirer');

function question(projectName, validates = {}) {
    return inquirer.prompt([
        {
            type: 'input',
            default: projectName,
            name: 'projectName',
            message: 'project-name: ',
            validate: validates.projectName || ((input) => {
                if (!input) {
                    return 'project-name is not allow empty';
                }
                return true;
            })
        },
        {
            type: 'input',
            name: 'description',
            message: 'project-description',
            validate: validates.description,
        },
    ]);
}

module.exports = question;
