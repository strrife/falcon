import { prettifyObject as prettifyObjectOriginal } from 'pino-pretty/lib/utils';
import colors, { Colorizer } from './colors';
import { LOGGER_KEYS, ERROR_LIKE_KEYS } from './constants';

export {
  prettifyErrorLog,
  prettifyLevel,
  prettifyMessage,
  prettifyMetadata,
  prettifyTime,
  internals,
  isObject
} from 'pino-pretty/lib/utils';

const defaultColorizer = colors();

declare type MaybeString = undefined | string;

export const prettifyModule: ({ log: any, colorizer: Colorizer }) => MaybeString = ({
  log,
  colorizer = defaultColorizer
}) => {
  if (log.module) {
    return `[${colorizer.random(log.module)}]`;
  }
  return undefined;
};

export const prettifyObject = ({
  input,
  ident = '    ',
  eol = '\n',
  skipKeys = [],
  errorLikeKeys = ERROR_LIKE_KEYS,
  excludeLoggerKeys = true
}) =>
  prettifyObjectOriginal({
    input,
    ident,
    eol,
    skipKeys: [...LOGGER_KEYS, ...skipKeys],
    errorLikeKeys,
    excludeLoggerKeys
  });
