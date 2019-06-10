export type Config = {
  debug?: boolean;
  maxListeners?: number;
  verboseEvents?: boolean;
  logLevel?: string;
  session: SessionConfig;
  port?: number;
};

export type SessionConfig = {
  keys: string[];
  options: object;
};
