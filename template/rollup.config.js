import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import reload from 'rollup-plugin-reload';
import minize from 'rollup-plugin-minize';
import lint from 'rollup-plugin-lintes';


import pkg from './package.json';
const config = require('./build/config');
const utils = require('./build/utils');

const isDev = process.env.NODE_ENV === 'development';
const isESM = process.env.ESM;

function getInputFile() {
    return utils.resolve(isDev ? config.devInput : config.buildInput);
}

function getOutputFile() {
    if (isDev) {
        return utils.resolve(`public/${config.fileName}-dev.js`);
    }
    if (isESM) {
        return utils.resolve(`dist/${config.fileName}.js`);
    }
    return utils.resolve(`dist/${config.fileName}-v${pkg.version}.js`);
}

const cfg = {
    input: getInputFile(),
    output: {
        file: getOutputFile(),
        name: config.libName,
        exports: 'named',
        format: (isDev || !isESM) ? 'iife' : 'esm',
        sourcemap: isDev,
    },
    plugins: [
        lint(),
        nodeResolve(),
        commonjs(),
        ...config.plugins,
        typescript({
            // 是否抛出校验异常
            noEmitOnError: !isDev,
        }),
    ],
};

// 开发环境下启动reload
if (isDev) {
    cfg.plugins.unshift(reload({
        contentBase: utils.resolve('public'),
        port: config.port,
    }));
} else if (!isESM) {
    cfg.plugins.push(minize());
}

module.exports = cfg;
