# Falcon Analytics Plugin

This plugin provides integration with Google Analytics.

## Installation

```bash
npm install @deity/falcon-analytics-plugin
```

In your `src/App.js` file - you need to import `@deity/falcon-analytics-plugin` package and attach to your `App` component:

```diff
// other imports
+ import withRouter from 'react-router-dom/withRouter';
+ import { initAnalytics, withAnalytics } from '@deity/falcon-analytics-plugin';

+ initAnalytics(config.analytics.trackingId, process.browser, config.debug);

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

There are 3 "disabled" states of this plugin:

- **Nothing will be executed** if `trackingId` is not passed (first argument)
- **Nothing will be executed on the server-side**, `process.browser` var controls that (second argument)
- **Nothing will be sent** to Google if `config.debug` is set to `true` (third argument), but will be shown in a browser's console (see below)

All other cases - this plugin will operate normally.

## Debug mode

In `debug` mode `true` and `trackingId` set properly - you will see all method
calls in your browser's console:

![falcon-analytics-plugin](https://user-images.githubusercontent.com/1118933/46871259-2c7e6380-ce31-11e8-9f53-7cb90d568b02.png "Browser console view")

## Extra features

You can also send any custom events to Google Analytics with `trackEvent` method:

```javascript
import { trackEvent } from '@deity/falcon-analytics-plugin';

export default Product {
  processPurchase() {
    trackEvent('Shop', 'Add to cart', this.props.productId);
    // call the actual "purchase" process here...
  }

  render() {
    return (
      <button onClick={() => this.processPurchase()}>Add to cart</button>
    );
  }
}
```