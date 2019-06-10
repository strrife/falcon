import React from 'react';
import { ServiceWorkerContext } from './ServiceWorkerContext';

export type ServiceWorkerRenderProps = {
  /** Determines if Service Worker API is supported by the Web Browser */
  isSupported: boolean;
  registration?: ServiceWorkerRegistration;
  /** If there's already an active Service Worker, then the user needs to close all their tabs before they'll get updates */
  isWaiting: boolean;
  /** Force update (auto reload in each open tab). */
  skipWaiting: Function;
};

export type ServiceWorkerProps = {
  children: (renderProps: ServiceWorkerRenderProps) => React.ReactNode;
};
export const ServiceWorker: React.SFC<ServiceWorkerProps> = ({ children }) => (
  <ServiceWorkerContext.Consumer>
    {({ isSupported, registration }) =>
      isSupported && registration ? (
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
          isSupported,
          isWaiting: false,
          skipWaiting: () => {}
        })
      )
    }
  </ServiceWorkerContext.Consumer>
);

type ServiceWorkerInnerProps = {
  registration: ServiceWorkerRegistration;
  children: (renderProps: { isWaiting: boolean; skipWaiting: Function }) => React.ReactNode;
};
type ServiceWorkerInnerState = {} & Pick<ServiceWorkerRenderProps, 'isWaiting' | 'skipWaiting'>;
class ServiceWorkerInner extends React.Component<ServiceWorkerInnerProps, ServiceWorkerInnerState> {
  constructor(props) {
    super(props);

    this.state = {
      isWaiting: false,
      skipWaiting: () => {}
    };
  }

  componentDidMount() {
    const { registration } = this.props;

    if (!navigator.serviceWorker.controller) {
      // The window client is not controlled, a new Service Worker will activate immediately
      return;
    }

    if (registration.waiting && registration.active) {
      this.setState(state => ({
        ...state,
        isWaiting: true,
        skipWaiting: () => registration.waiting.postMessage({ type: 'SKIP_WAITING', payload: undefined })
      }));
    } else {
      registration.addEventListener('updatefound', () => {
        // updatefound is also fired for the very first install. ¯\_(ツ)_/¯
        const newServiceWorker = registration.installing;

        newServiceWorker.addEventListener('statechange', event => {
          if (event.target.state === 'installed') {
            if (registration.active) {
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
