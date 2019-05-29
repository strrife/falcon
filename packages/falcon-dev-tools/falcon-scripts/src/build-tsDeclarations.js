const path = require('path');
const glob = require('glob');
const ts = require('typescript');

function tsc(fileNames, options) {
  const program = ts.createProgram(fileNames, options);

  program.emit();
}

module.exports = ({ packagePath }) => {
  console.log(`building ts declarations...`);

  const files = glob.sync(`${path.join(packagePath, 'src')}/*(*.ts|*.tsx)`);

  tsc(files, {
    outDir: 'dist',
    declarationDir: 'dist',
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: ts.JsxEmit.React,
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
