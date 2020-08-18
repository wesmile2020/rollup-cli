const worker = require('rollup-plugin-worker');
const typescript = require('@rollup/plugin-typescript');
const lint = require('rollup-plugin-lintes');

module.exports = {
    fileName: 'build',
    devInput: 'src/index.ts',
    buildInput: 'src/index.ts',
    port: 8080,
    libName: 'LIB',
    external: [],
    plugins: [
        worker({
            uglify: process.env.NODE_ENV === 'production',
            plugins: [
                lint(),
                typescript({
                    noEmitOnError: process.env.NODE_ENV === 'production',
                }),
            ],
        }),
    ],
};
