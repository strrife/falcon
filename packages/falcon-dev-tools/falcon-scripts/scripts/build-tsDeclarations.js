const path = require('path');
const glob = require('glob');
const ts = require('typescript');

function tsc(fileNames, options) {
  const program = ts.createProgram(fileNames, options);

  program.emit();
}

module.exports = ({ packagePath }) => {
  const files = glob.sync(`${path.join(packagePath, 'src')}/*(*.ts|*.tsx)`);

  tsc(files, {
    outDir: 'dist',
    declarationDir: 'dist',
    target: 6,
    module: 6,
    moduleResolution: 2,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: 2,
    strict: true,
    noFallthroughCasesInSwitch: true,
    noImplicitReturns: true,
    noUnusedParameters: true,
    sourceMap: true,
    skipLibCheck: true,
    declaration: true,
    emitDeclarationOnly: true,
    declarationMap: true,
    forceConsistentCasingInFileNames: true,
    pretty: true
  });
};
