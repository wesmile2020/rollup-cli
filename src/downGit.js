const download = require('download-git-repo');

function downGit(repo, target) {
    return new Promise((resolve, reject) => {
        download(`direct:${repo}`, target, { clone: true }, (err) => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve('success');
            }
        })
    })
}

module.exports = downGit;
