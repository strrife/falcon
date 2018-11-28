// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-extended';
import React from 'react';
import Helmet from 'react-helmet';
import { asyncComponent } from 'react-async-component';
import { Route, Switch } from 'react-router-dom';
import { translate } from 'react-i18next';
import Koa from 'koa';
import supertest from 'supertest';
import { Server } from './server';
import DynamicRoute from './components/DynamicRoute';
import defaultConfiguration from './clientApp/defaultConfiguration';

describe('Server', () => {
  it('Should properly call eventHandlers', () => {
    const onServerCreatedMock = jest.fn();
    const onServerInitializedMock = jest.fn();
    const onServerStartedMock = jest.fn();
    const config = defaultConfiguration({
      serverSideRendering: true,
      logLevel: 'error'
    });
    const bootstrap = {
      config,
      onServerCreated: onServerCreatedMock,
      onServerInitialized: onServerInitializedMock,
      onServerStarted: onServerStartedMock
    };

    const server = Server({
      App: () => <div />,
      bootstrap,
      clientApolloSchema: {
        defaults: {}
      },
      webpackAssets: {}
    });
    server.started();

    expect(server.instance).toBeInstanceOf(Koa);
    expect(onServerCreatedMock).toBeCalledWith(server.instance);

    expect(onServerInitializedMock).toBeCalledWith(server.instance);
    expect(onServerInitializedMock).toHaveBeenCalledAfter(onServerCreatedMock);

    expect(onServerStartedMock).toBeCalledWith(server.instance);
    expect(onServerStartedMock).toHaveBeenCalledAfter(onServerInitializedMock);
  });

  it('Should render Home page (SSR)', async () => {
    Helmet.canUseDOM = false;
    const Home = translate()(({ t }) => (
      <div>
        <h2>Foo</h2>
        <p>{t('key')}</p>
      </div>
    ));

    const App = () => (
      <Switch>
        <Route exact path="/" component={Home} />
        <DynamicRoute
          components={{
            shop: asyncComponent({
              resolve: () => import('./__mocks__/pages/Shop')
            }),
            post: asyncComponent({
              resolve: () => import('./__mocks__/pages/Post')
            })
          }}
        />
      </Switch>
    );

    const config = defaultConfiguration({
      logLevel: 'error',
      serverSideRendering: true,
      googleTagManager: {
        id: null
      },
      i18n: {
        lng: 'en',
        resources: { en: { common: { key: 'foo bar baz' } } }
      }
    });
    const bootstrap = {
      config,
      onServerCreated: () => {},
      onServerInitialized: () => {}
    };
    const clientApolloSchema = {
      defaults: {},
      resolvers: {
        Query: {}
      }
    };

    const serverHandler = Server({
      App,
      bootstrap,
      clientApolloSchema,
      webpackAssets: {}
    }).callback();
    const response = await supertest(serverHandler).get('/');

    expect(response.status).toBe(200);
    expect(response.headers).toContainKey('server-timing');
    expect(response.text).toEqual(expect.stringContaining('<h2>Foo</h2>'));
    expect(response.text).toEqual(expect.stringContaining('<p>foo bar baz</p>'));
  });
});
