/**
 * Unregister all registered service workers
 * @param {string} scope scope
 * @returns {void}
 */
export function unregisterAll(scope = '/') {
  navigator.serviceWorker.getRegistrations().then(swRegistrations => {
    swRegistrations
      .filter(registration => registration.scope.match(`${window.location}${scope}`))
      .forEach(registration =>
        registration
          .unregister()
          .then(console.log(`SW unregistered for '${registration.scope}'.`))
          .catch(x => console.warn(`SW unregistration for '${registration.scope}' failed.`, x))
      );
  });
}

export function configureServiceWorker() {
  if (window.navigator && 'serviceWorker' in navigator) {
    if (process.env.NODE_ENV !== 'production') {
      unregisterAll();
    }
  }
}
