const path = require('path');
const fs = require('fs');

function resolve(dir) {
    return path.resolve(__dirname, '..', dir);
}

function delDir(path){
    if (!fs.existsSync(path)) return;
    const stats = fs.statSync(path);
    if (stats.isDirectory()) {
        const dir = fs.readdirSync(path);
        for (let i = 0; i < dir.length; i += 1) {
            const curPath = `${path}/${dir[i]}`;
            const curStats = fs.statSync(curPath);
            if (curStats.isDirectory()) {
                delDir(curPath);
                fs.rmdirSync(curPath);
            } else if (curStats.isFile()) {
                fs.unlinkSync(curPath);
            }
        }
    }
}

module.exports = {
    resolve,
    delDir,
};
