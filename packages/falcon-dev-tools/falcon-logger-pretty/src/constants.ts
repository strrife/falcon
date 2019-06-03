export const DATE_FORMAT: string = 'yyyy-mm-dd HH:MM:ss.l o';

export const ERROR_LIKE_KEYS: string[] = ['err', 'error'];

export const MESSAGE_KEY: string = 'msg';

export const TIMESTAMP_KEY: string = 'time';

export const LEVELS: { [key: string]: string } = {
  default: 'USERLVL',
  60: 'FATAL',
  50: 'ERROR',
  40: 'WARN ',
  30: 'INFO ',
  20: 'DEBUG',
  10: 'TRACE'
};

export const LEVEL_NAMES: { [key: string]: number } = {
  fatal: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10
};

export const LOGGER_KEYS: string[] = ['pid', 'hostname', 'name', 'level', 'time', 'timestamp', 'module', 'v'];
