import fetch from 'node-fetch';

export async function ProxyRequest(targetUrl, ctx) {
  const { method, header } = ctx.request;
  const response = await fetch(targetUrl, {
    method,
    headers: header,
    body: method === 'POST' ? ctx.req : undefined
  });

  response.headers.forEach((value, name) => {
    ctx.set(name, value);
  });

  // https://github.com/bitinn/node-fetch/blob/master/src/headers.js#L120
  // node-fetch returns `set-cookie` headers concatenated with ", " (which is invalid)
  // for this reason we get a list of "raw" headers and set them to the response
  ctx.set('set-cookie', response.headers.raw()['set-cookie'] || []);

  return response;
}
