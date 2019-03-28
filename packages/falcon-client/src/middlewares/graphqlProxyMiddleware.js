import { ProxyRequest } from '../service/ProxyRequest';

// GraphQL Proxy to Falcon-Server
export default httpLinkUri => async ctx => {
  const result = await ProxyRequest(httpLinkUri, ctx);
  ctx.status = result.status;
  ctx.body = result.body;
};
