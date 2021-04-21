const path = require('path');
const fs = require('fs');

function delFile(target) {
    if (!fs.existsSync(target)) {
        return;
    }
    const stat = fs.statSync(target)
    if (stat.isFile()) {
        fs.unlinkSync(target);
    } else if (stat.isDirectory()) {
        const dirs = fs.readdirSync(target);
        for (let i = 0; i < dirs.length; i += 1) {
            delFile(path.join(target, dirs[i]));
        }
        fs.rmdirSync(target);
    }
}

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
        if (options.exclude instanceof RegExp) {
            excludeReg = options.exclude;
        } else if (typeof options.exclude === 'string') {
            excludeReg = new RegExp(options.exclude);
        }
    }
    loopCopy(from, to, excludeReg);
}

function updateJson(target, replace, format = 4) {
    if (!fs.existsSync(target)) return;
    const stat = fs.statSync(target);
    if (!stat.isFile()) return;
    const obj = JSON.parse(fs.readFileSync(target, { encoding: 'utf-8' }));
    const resultObj = { ...obj, ...replace };
    fs.writeFileSync(target, JSON.stringify(resultObj, null, format));
}

module.exports = {
    delFile,
    copyFile,
    getFileName,
    updateJson,
}
