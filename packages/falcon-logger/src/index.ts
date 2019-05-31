import pino, { Logger as PinoLogger, Level } from 'pino';

export type Logger = {
  setLogLevel: (level: Level) => void;
  getModule: (moduleName: string) => Logger;
  traceTime: (label: string, fn: () => Promise<any>) => Promise<any>;
} & PinoLogger;

const logger: Logger = pino() as Logger;

/**
 * Set global log level
 * @param {Level} level Required log level
 * @returns {void}
 */
logger.setLogLevel = (level: Level): void => {
  logger.level = level;
};

/**
 *
 * @param {string} moduleName Module name
 * @returns {Logger} Module-specific Logger instance
 */
logger.getModule = (moduleName: string): Logger => logger.child({ module: moduleName }) as Logger;

/**
 * @param {string} label Log label
 * @param {() => Promise<any>} fn Function to trace the execution time of
 * @returns {Promise<any>} fn result
 */
logger.traceTime = async function(label, fn) {
  // using `function()` statement to preserve the context in case of "getModule" call
  if (this.level !== 'trace') {
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
