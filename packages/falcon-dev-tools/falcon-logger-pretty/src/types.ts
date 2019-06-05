import { Colorizer } from './colors';

export type GetSourceFileResolveInput = {
  line: number;
  column: number;
};

export type GetSourceFile = {
  path: string;
  text: string;
  lines: string[];
  resolve: (input: GetSourceFileResolveInput) => GetSourceFileResult;
};

export type GetSourceFileResult = {
  line: number;
  column: number;
  sourceFile: string;
  sourceLine: string;
};

export type MaybeString = undefined | string;

export type PrettifyModuleInput = {
  log: any;
  colorizer: Colorizer;
};

export type PrettifyGraphQLErrorLogInput = {
  ident: string;
  eol: string;
} & PrettifyModuleInput;

export type ReadSourceInput = {
  colorizer: Colorizer;
  stack: string[];
  setLineNumber?: boolean;
  paddingLines?: number;
};
