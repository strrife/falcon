import fetch from 'node-fetch';

// GraphQL Proxy to Falcon-Server
export default graphqlUrl => async ctx => {
  const { request } = ctx;
  const { method, header } = request;

  const result = await fetch(graphqlUrl, {
    method,
    headers: header,
    body: method === 'POST' ? ctx.req : undefined
  });

  result.headers.forEach((value, name) => {
    ctx.set(name, value);
  });

  // https://github.com/bitinn/node-fetch/blob/master/src/headers.js#L120
  // node-fetch returns `set-cookie` headers concatenated with ", " (which is invalid)
  // for this reason we get a list of "raw" headers and set them to the response
  ctx.set('set-cookie', result.headers.raw()['set-cookie'] || []);

  ctx.status = result.status;
  ctx.body = result.body;
};
