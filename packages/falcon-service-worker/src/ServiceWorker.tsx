import React from 'react';
import { ServiceWorkerContext } from './ServiceWorkerContext';

export type ServiceWorkerRenderProps = {
  isSupported: boolean;
  registration?: ServiceWorkerRegistration;
  isWaiting: boolean;
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
type ServiceWorkerInnerState = {
  isWaiting: boolean;
  skipWaiting: Function;
};
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
