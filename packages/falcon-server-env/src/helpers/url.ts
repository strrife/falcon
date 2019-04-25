import { format } from 'url';

declare type UrlParams = {
  protocol?: string;
  host?: string;
  port?: number;
};

export const canFormatUrl = ({ protocol, host }: UrlParams) => {
  if (!protocol || !host) {
    return false;
  }

  return true;
};

export const formatUrl = ({ protocol, host, port }: UrlParams): string => {
  if (!canFormatUrl({ protocol, host })) {
    throw new Error('"host" and "protocol" are required!');
  }

  return format({
    protocol: protocol === 'https' || Number(port) === 443 ? 'https' : 'http',
    hostname: host,
    port: Number(port) || undefined
  });
};
