**Note:** This is a cumulative changelog that outlines all of the changes to all the packages from [packages](./packages) folder.

Versions marked with a number and date (e.g. Falcon Client v0.1.0 (2018-10-05)) are already released and available via npm. Versions without a date are not released yet.

## Falcon v0.2

- added nightly builds ([#117](https://github.com/deity-io/falcon/pull/117))

### Falcon Client v0.0.3 (`@deity/falcon-client`)

- removed razzle ([#87](https://github.com/deity-io/falcon/pull/87))
- support for Google Analytics added ([#78](https://github.com/deity-io/falcon/pull/78))

### Falcon UI v0.0.4 (`@deity/falcon-ui`)

- comprehensive documentation added ([#115](https://github.com/deity-io/falcon/pull/115))

### Falcon Theme Editor v0.0.4 (`@deity/falcon-theme-editor`)

- inspect mode, more props, improved performance, layout tweaks ([#115](https://github.com/deity-io/falcon/pull/115))

### Falcon E-commerce UI Kit v0.0.4 (`@deity/falcon-ecommerce-uikit`)

- added queries and mutations for cart operations (add to cart, remove from cart, change cart item) ([#114](https://github.com/deity-io/falcon/pull/114))

### Create Falcon App v1.0.7 (2018-10-25) (`create-falcon-app`)

- updated documentation ([#47](https://github.com/deity-io/falcon/pull/47))
- fixed problem with React 16.6.0 ([#109](https://github.com/deity-io/falcon/pull/109))

---

## Falcon v0.1 (2018-10-05)

### Falcon Client v0.0.1 (2018-10-05) (`@deity/falcon-client`)

- development and build process using razzle (https://github.com/jaredpalmer/razzle)
- built in SSR
- built in i18n
- connection with Falcon Server via [Apollo Client](https://www.apollographql.com/docs/react/)
- state management via [Apollo Link State](https://www.apollographql.com/docs/link/links/state.html)

### Falcon Server v0.0.1 (2018-10-05) (`@deity/falcon-server`)

- extensions system with built-in schema stitching
- all the communication based on GraphQL (using [Apollo Server](https://www.apollographql.com/docs/apollo-server/))

### Falcon UI v0.0.1 (2018-10-05) (`@deity/falcon-ui`)

- basic set of components with theming capabilities
- first version of theme editor as React component

### Falcon E-commerce UI Kit v0.0.1 (2018-10-05) (`@deity/falcon-ecommerce-uikit`)

- product list view
- product page view
- mini cart view on sidebar

### Create Falcon App v1.0.0 (2018-10-05) (`create-falcon-app`)

- creating Falcon project from predefined template

### Falcon Shop Extension v0.0.1 (2018-10-05) (`@deity/falcon-shop-extension`)

- first version of schema for shop features

### Falcon Magento2 Api v0.0.1 (2018-10-05) (`@deity/falcon-magento2-api`)

- resolvers for Falcon Shop Extension used for communication with Magento2 shop

### Falcon Blog Extension v0.0.1 (2018-10-05) (`@deity/falcon-blog-extension`)

- first version of schema for blog features

### Falcon WordPress Api v0.0.1 (2018-10-05) (`@deity/falcon-wordpress-api`)

- resolvers for Falcon Blog Extension used for communication with WordPress backend
