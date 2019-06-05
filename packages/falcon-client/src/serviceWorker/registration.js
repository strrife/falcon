function showRefreshUI(registration) {
  // TODO: Display a toast or refresh UI.
  // This demo creates and injects a button.
  const button = document.createElement('button');
  button.style.position = 'absolute';
  button.style.top = '80px';
  button.style.left = '20px';
  button.textContent = 'This site has updated. Please click here to see changes.';
  button.addEventListener('click', () => {
    if (!registration.waiting) {
      // Just to ensure registration.waiting is available before
      // calling postMessage()
      return;
    }
    button.disabled = true;
    registration.waiting.postMessage({ type: 'SKIP_WAITING', payload: undefined });
  });
  document.body.appendChild(button);
}

/**
 * Register Service Worker
 * @param {string} swPath public path to service worker
 * @returns {void}
 */
export function register(swPath = '/sw.js') {
  const isHttps = window.location.protocol === 'https:';
  const isLocalHost = window.location.host.match(/(localhost|127.0.0.1)/);

  if (!isHttps && !isLocalHost) {
    return;
  }
  const scope = '/';

  const registerSw = () => {
    navigator.serviceWorker
      .register(swPath, { scope })
      .then(registration => {
        if (isLocalHost) {
          console.log(`SW registered for '${scope}'.`, registration);
        }

        // Track updates to the Service Worker.
        if (!navigator.serviceWorker.controller) {
          console.log(`The window client is not currently controlled
            so it is a new service worker that will activate immediately`);

          // return;
        }
        // registration.update();

        if (registration.waiting && registration.active) {
          console.log('1 Please close all tabs to get updates. registration.waiting && registration.active');
          showRefreshUI(registration);
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

                  showRefreshUI(registration);
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
      })
      .catch(registrationError => {
        console.warn(`SW registration for '${scope}' failed.`, registrationError);
      });

    // let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', e => {
      if (e.currentTarget !== navigator.serviceWorker.controller) {
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
    });
  };

  // if 'load' event has already been called then document.readyState is set to 'complete'
  // in that case we register SW immediately, otherwise we delay it until 'load' event is fired
  if (document.readyState === 'complete') {
    registerSw();
  } else {
    window.addEventListener('load', registerSw);
  }
}

/**
 * Unregister all registered service workers
 * @returns {void}
 */
export function unregisterAll() {
  navigator.serviceWorker.getRegistrations().then(swRegistrations => {
    swRegistrations.forEach(registration =>
      registration
        .unregister()
        .then(console.log(`SW unregistered for '${registration.scope}'.`))
        .catch(x => console.warn(`SW unregistration for '${registration.scope}' failed.`, x))
    );
  });
}

export function configureServiceWorker() {
  if (window.navigator && 'serviceWorker' in navigator) {
    if (process.env.NODE_ENV === 'production') {
      register('/sw.js');
    } else {
      unregisterAll();
    }
  }
}
