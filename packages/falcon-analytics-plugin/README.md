# Falcon Analytics Plugin

This plugin provides a `withAnalytics` Higher-Order Component to wrap your `App` component
and send basic "pageview" analytics data to the provided Google Analytics account.

> This plugin re-exports all available methods in https://github.com/react-ga/react-ga package,
> so you could import them directly from `@deity/falcon-analytics-plugin` module.

## Installation

```bash
npm install @deity/falcon-analytics-plugin
```

In your `src/App.js` file - you need to import `@deity/falcon-analytics-plugin` package and attach to your `App` component:

```diff
// other imports
+ import withRouter from 'react-router-dom/withRouter';
+ import { initialize, withAnalytics } from '@deity/falcon-analytics-plugin';

+ initialize(config.analytics.trackingId);

const App = () => {
  { /* other components */ }
  <Switch>
    { /* other routes */ }
  </Switch>
  ...
}

- export default isOnline()(App);
+ export default isOnline()(withRouter(withAnalytics(App)));
```

`initialize` method can accept on [object configuration](https://github.com/react-ga/react-ga#reactgainitializegatrackingid-options)
as the second argument.

> In development mode - it is recommended to use `debug` and `testMode` set to `true`.
