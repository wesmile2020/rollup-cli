const path = require('path');
const fs = require('fs');

function getFileName(url) {
    const arr = url.split(path.sep);
    return arr[arr.length - 1];
}

function loopCopy(from, to, exclude) {
    if (exclude.test(from) || !fs.existsSync(from) || !fs.existsSync(to)) return;
    const toStats = fs.statSync(to);
    if (!toStats.isDirectory()) {
        console.log(`copyFile: to is not a dir`);
        return;
    }
    const fromStats = fs.statSync(from);
    if (fromStats.isDirectory()) {
        const dir = fs.readdirSync(from);
        for (let i = 0; i < dir.length; i += 1) {
            const itemFrom = path.resolve(from, dir[i]);
            if (!exclude.test(itemFrom)) {
                const itemTo = path.resolve(to, dir[i]);
                const fromStats = fs.statSync(itemFrom);
                if (fromStats.isDirectory()) {
                    fs.mkdirSync(itemTo);
                    loopCopy(itemFrom, itemTo, exclude);
                } else {
                    fs.copyFileSync(itemFrom, itemTo);
                }
            }
        }
    } else if (fromStats.isFile()) {
        const fileName = getFileName(from);
        fs.copyFileSync(from, path.resolve(to, fileName));
    }
}

function copyFile(from, to, options = {}) {
    let excludeReg = /^[]/;
    if (options.exclude) {
        let str = '';
        if (options.exclude instanceof RegExp) {
            str = options.exclude.toString();
        } else if (typeof options.exclude === 'string') {
            str = options.exclude;
        }
        excludeReg = new RegExp(from + '[^]+' + str);
    }
    loopCopy(from, to, excludeReg);
}

module.exports = {
    copyFile,
};
