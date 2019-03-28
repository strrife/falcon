import bootstrap from 'app-path/bootstrap';
import defaultConfiguration from './defaultConfiguration';

export default async () => {
  const appBootstrap = await bootstrap();
  return {
    config: defaultConfiguration(appBootstrap.config),
    onServerCreated: appBootstrap.onServerCreated || (() => {}),
    onServerInitialized: appBootstrap.onServerInitialized || (() => {}),
    onServerStarted: appBootstrap.onServerStarted || (() => {}),
    onRouterCreated: appBootstrap.onRouterCreated || (() => {}),
    onRouterInitialized: appBootstrap.onRouterInitialized || (() => {})
  };
};
