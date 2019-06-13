const path = require('path');
const glob = require('glob');
const ts = require('typescript');
const Logger = require('@deity/falcon-logger');

class FormatHost {
  getCurrentDirectory() {
    return ts.sys.getCurrentDirectory();
  }

  getCanonicalFileName(fileName) {
    return path.normalize(fileName);
  }

  getNewLine() {
    return ts.sys.newLine;
  }
}

function tsc(fileNames, options) {
  const prettyErrors = true;
  const formatHost = new FormatHost();

  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();
  let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics = ts.sortAndDeduplicateDiagnostics(allDiagnostics);

  allDiagnostics
    .map(item => {
      const entry = {
        flatMessage: ts.flattenDiagnosticMessageText(item.messageText, '\n'),
        formatted: ts.formatDiagnosticsWithColorAndContext(allDiagnostics, formatHost),
        category: item.category,
        code: item.code
      };

      if (item.file && item.start !== undefined) {
        const { line, character } = item.file.getLineAndCharacterOfPosition(item.start);
        entry.fileLine = `${item.file.fileName}(${line + 1},${character + 1})`;
      }

      return entry;
    })
    .forEach(item => {
      let category = '';
      let loggerMethod = 'info';

      switch (item.category) {
        case 1 /* Error */:
          loggerMethod = 'error';
          category = 'error';
          break;
        case 3 /* Message */:
          loggerMethod = 'info';
          break;

        case 0 /* Warning */:
        case 2 /* Suggestion */:
        default:
          loggerMethod = 'warn';
          category = 'warning';
          break;
      }

      const type = `${item.type} `;

      if (prettyErrors) {
        Logger[loggerMethod](`${item.formatted}`);
      } else if (item.fileLine !== undefined) {
        Logger[loggerMethod](`${item.fileLine}: ${type}${category} TS${item.code}: ${item.flatMessage}`);
      } else {
        Logger[loggerMethod](`${type}${category} TS${item.code}: ${item.flatMessage}`);
      }
    });
}

module.exports = ({ packagePath }) => {
  Logger.log(`building d.ts...`);

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
    alwaysStrict: true,
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
