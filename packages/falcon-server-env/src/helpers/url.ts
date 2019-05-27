import { format } from 'url';

declare type UrlParams = {
  protocol?: string;
  host?: string;
  port?: number;
};

export const canFormatUrl = ({ host }: UrlParams) => !!host;

export const formatUrl = ({ protocol, host, port }: UrlParams): string => {
  if (!canFormatUrl({ host })) {
    throw new Error('"host" is required!');
  }

  return format({
    protocol: protocol === 'https' || Number(port) === 443 ? 'https' : 'http',
    hostname: host,
    port: Number(port) || undefined
  });
};
