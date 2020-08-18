const TypeDoc = require('typedoc');
const utils = require('./utils');

const app = new TypeDoc.Application({
    mode: 'Modules',
    target: 'ES5',
    module: 'ESNEXT',
    experimentalDecorators: true,
    ignoreCompilerErrors: true,
});

const input = utils.resolve('src');
const output = utils.resolve('docs');

utils.delDir(output);

const project = app.convert(app.expandInputFiles([input]));

if (project) { 
    // Project may not have converted correctly
    // Rendered docs
    app.generateDocs(project, output);
}
