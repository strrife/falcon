import supertest from 'supertest';
import Koa from 'koa';
import { FalconServer, Config, Events } from '.';

describe('Falcon Server', () => {
  const config: Config = {
    debug: true,
    port: 4000,
    logLevel: 'error',
    endpoints: {
      'fake-api': {
        package: 'fake-backend-endpoints',
        config: {
          host: 'fake.host.com',
          protocol: 'http'
        }
      }
    },
    session: {
      keys: ['secret']
    }
  };

  it('Should handle an incoming request to a custom API DataSource endpoint', async (done: jest.DoneCallback) => {
    const server = new FalconServer(config);
    await server.initialize();

    server.eventEmitter.on(Events.AFTER_WEB_SERVER_CREATED, async (app: Koa) => {
      const serverCallback = app.callback();
      const response = await supertest(serverCallback).get('/api/info');
      expect(response.text).toBe('foo');
      done();
    });
  });
});
