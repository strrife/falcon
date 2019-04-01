import { format } from 'url';

declare type UrlParams = {
  protocol?: string;
  host?: string;
  port?: number;
};

export const formatUrl = ({ protocol, host, port }: UrlParams): string =>
  format({
    protocol: protocol === 'https' || Number(port) === 443 ? 'https' : 'http',
    hostname: host,
    port: Number(port) || undefined
  });
