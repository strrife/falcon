import bourne from '@hapi/bourne';
import { MESSAGE_KEY, ERROR_LIKE_KEYS } from 'pino-pretty/lib/constants';
import { isObject, prettifyErrorLog, prettifyObject } from 'pino-pretty/lib/utils';

const jsonParser: (input: string) => { value?: any; err?: any } = input => {
  try {
    return { value: bourne.parse(input, { protoAction: 'remove' }) };
  } catch (err) {
    return { err };
  }
};

const messageKey = MESSAGE_KEY;
const errorLikeObjectKeys = ERROR_LIKE_KEYS;
const EOL = '\r\n';
const IDENT = '    ';

export default () => inputData => {
  let log;
  let line = '';
  if (!isObject(inputData)) {
    const parsed = jsonParser(inputData);
    log = parsed.value;
    if (parsed.err) {
      // pass through
      return inputData + EOL;
    }
  } else {
    log = inputData;
  }

  // Short-circuit for spec allowed primitive values.
  if ([null, true, false].includes(log)) {
    return log + EOL;
  }

  if (messageKey in log === false) return undefined;
  if (typeof log[messageKey] !== 'string') return undefined;

  line += log[messageKey] + EOL;

  if (log.type === 'Error' && log.stack) {
    const prettifiedErrorLog = prettifyErrorLog({
      log,
      errorLikeKeys: errorLikeObjectKeys,
      errorProperties: [],
      ident: IDENT,
      eol: EOL
    });
    line += prettifiedErrorLog;
  } else {
    const skipKeys = typeof log[messageKey] === 'string' ? [messageKey] : undefined;
    const prettifiedObject = prettifyObject({
      input: log,
      skipKeys,
      errorLikeKeys: errorLikeObjectKeys,
      eol: EOL,
      ident: IDENT
    });
    line += prettifiedObject;
  }

  return line;
};
