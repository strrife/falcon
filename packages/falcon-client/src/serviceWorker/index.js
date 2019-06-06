import React from 'react';

const ServiceWorkerContext = React.createContext({ scriptUrl: '' });

export class ServiceWorkerRegistrar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSupported: false,
      registration: undefined
    };
  }

  componentDidMount() {
    if (!this.isSupported) {
      return;
    }

    this.whenReady(() => {
      const { scriptUrl, options } = this.props;

      navigator.serviceWorker
        .register(scriptUrl, options)
        .then(registration => {
          this.setState(state => ({
            ...state,
            isSupported: true,
            registration
          }));
          navigator.serviceWorker.addEventListener('controllerchange', this.onControllerChange);

          console.log(`Service Worker '${scriptUrl}' registered in '${registration.scope}' scope.`);
        })
        .catch(error => {
          console.warn(`Service Worker '${scriptUrl}' registration failed.`, error);
        });
    });
  }

  componentWillUnmount() {
    if (!this.isSupported) {
      return;
    }

    navigator.serviceWorker.removeEventListener('controllerchange', this.onControllerChange);
  }

  onControllerChange(event) {
    if (event.currentTarget !== navigator.serviceWorker.controller) {
      console.log('return window.location.reload();');
      return window.location.reload();
    }

    // if (refreshing) {
    //   return;
    // }
    // refreshing = true;
    // return window.location.reload();

    // This fires when the service worker controlling this page
    // changes, eg a new worker has skipped waiting and become
    // the new active worker.
  }

  get isSupported() {
    const { navigator, location } = window;
    const isApiAvailable = navigator && 'serviceWorker' in navigator;
    const isHttps = location.protocol === 'https:';
    const isLocalHost = location.host.match(/(localhost|127.0.0.1)/);

    return isApiAvailable && (isHttps || isLocalHost);
  }

  /**
   * if `document.readyState` is `complete` invoke `callback` immediately, otherwise delay it until `load` event is fired
   * @param {Function} callback function
   */
  whenReady(callback) {
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', () => callback());
    }
  }

  render() {
    const { children, ...props } = this.props;
    const { isSupported, registration } = this.state;

    return (
      <ServiceWorkerContext.Provider
        value={{
          isSupported,
          registration,
          scriptUrl: props.scriptUrl,
          options: props.options
        }}
      >
        {children}
      </ServiceWorkerContext.Provider>
    );
  }
}

export const ServiceWorker = ({ children }) => (
  <ServiceWorkerContext.Consumer>
    {({ isSupported, registration }) =>
      registration ? (
        <ServiceWorkerInner registration={registration}>
          {({ isWaiting, skipWaiting }) =>
            children({
              isSupported,
              registration,
              isWaiting,
              skipWaiting
            })
          }
        </ServiceWorkerInner>
      ) : (
        children({
          isWaiting: false,
          skipWaiting: () => {}
        })
      )
    }
  </ServiceWorkerContext.Consumer>
);

class ServiceWorkerInner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaiting: false,
      skipWaiting: () => {}
    };
  }

  componentDidMount() {
    const { registration } = this.props;

    // Track updates to the Service Worker.
    if (!navigator.serviceWorker.controller) {
      console.log(`The window client is not currently controlled
            so it is a new service worker that will activate immediately`);

      // return;
    }
    // registration.update();

    if (registration.waiting && registration.active) {
      console.log('1 Please close all tabs to get updates. registration.waiting && registration.active');
      this.setState(state => ({
        ...state,
        isWaiting: true,
        skipWaiting: () => registration.waiting.postMessage({ type: 'SKIP_WAITING', payload: undefined })
      }));
    } else {
      // updatefound is also fired for the very first install. ¯\_(ツ)_/¯
      registration.addEventListener('updatefound', () => {
        registration.installing.addEventListener('statechange', event => {
          if (event.target.state === 'installed') {
            if (registration.active) {
              // If there's already an active SW, and skipWaiting() is not
              // called in the SW, then the user needs to close all their
              // tabs before they'll get updates.
              console.log('2 Please close all tabs to get updates. statechange');

              this.setState(state => ({
                ...state,
                isWaiting: true,
                skipWaiting: () => registration.waiting.postMessage({ type: 'SKIP_WAITING', payload: undefined })
              }));
            } else {
              // Otherwise, this newly installed SW will soon become the
              // active SW. Rather than explicitly wait for that to happen,
              // just show the initial "content is cached" message.
              console.log('Content is cached for the first time!');
            }
          }
        });
      });
    }

    // registration.installing.addEventListener(); // the installing worker, or undefined
    // registration.waiting; // the waiting worker, or undefined
    // registration.active; // the active worker, or undefined

    // registration.addEventListener('updatefound', () => {
    //   // A wild service worker has appeared in reg.installing!
    //   const newWorker = registration.installing;

    //   newWorker.state;
    //   // "installing" - the install event has fired, but not yet complete
    //   // "installed"  - install complete
    //   // "activating" - the activate event has fired, but not yet complete
    //   // "activated"  - fully active
    //   // "redundant"  - discarded. Either failed install, or it's been
    //   //                replaced by a newer version

    //   newWorker.addEventListener('statechange', () => {
    //     // newWorker.state has changed
    //   });
    // });
  }

  componentWillUnmount() {}

  render() {
    const { children } = this.props;
    const { isWaiting, skipWaiting } = this.state;

    return children({ isWaiting, skipWaiting });
  }
}
