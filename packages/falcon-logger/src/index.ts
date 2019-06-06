import pino, { Logger as PinoLogger, Level } from 'pino';
import { chindingsSym } from 'pino/lib/symbols';

export type Logger = {
  setLogLevel: (level: Level) => void;
  setApp: (name: string) => void;
  getFor: (moduleName: string) => Logger;
  traceTime: (label: string, fn: () => Promise<any>) => Promise<any>;
} & PinoLogger;

let isAppSet: boolean = false;
const logger: Logger = pino() as Logger;

/**
 * Set global log level
 * @param {Level} level Required log level
 * @returns {void}
 */
logger.setLogLevel = level => {
  logger.level = level;
};

/**
 * @param {string} name Application name
 * @returns {void}
 */
logger.setApp = name => {
  if (isAppSet) {
    return;
  }
  logger[chindingsSym] += `,"app":"${name}"`;
  isAppSet = true;
};

/**
 *
 * @param {string} moduleName Module name
 * @returns {Logger} Module-specific Logger instance
 */
logger.getFor = (moduleName: string): Logger => logger.child({ module: moduleName }) as Logger;

/**
 * @param {string} label Log label
 * @param {() => Promise<any>} fn Function to trace the execution time of
 * @returns {Promise<any>} fn result
 */
logger.traceTime = async function(label, fn) {
  // using `function()` statement to preserve the context in case of "getFor" call
  if (!this.isLevelEnabled('trace')) {
    return fn();
  }

  const startTime = Date.now();
  try {
    return await fn();
  } finally {
    const duration = Date.now() - startTime;
    this.trace(`${label} (${duration}ms)`);
  }
};

export default logger;
