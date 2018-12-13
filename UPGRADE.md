# Upgrade notes

**Note:** This is a cumulative upgrade notes file, that provides detailed instructions
on how to migrate your previously generated Falcon-based project to a newer version.

> Make sure you remove your `node_modules` folders from both `client` and `server` apps
> to ensure a proper installation of NPM packages before any upgrade between Falcon versions.

## Falcon 0.1.0 to 0.2.0

### Falcon-Server 0.2.0

- Change your `apis` and `extensions` config keys to the following structure:
```diff
{
  ...,
-  "apis": [
-    {
-      "name": "api-wordpress",
+  "apis": {
+    "api-wordpress": {
       "package": "@deity/falcon-wordpress-api",
       "config": {
         "host": "wordpress.deity.io",
         "protocol": "https",
         "apiPrefix": "/wp-json",
         "apiSuffix": "/wp/v2"
       }
     },
   },
```
- If you were using "endpoints" within your ApiDataSource class - you have to move them to a separate config
section (read more about Endpoints [here](https://falcon.deity.io/docs/falcon-server/endpoints))
- `Events` enum object has been moved to `@deity/falcon-server-env` package:
```diff
- const { Events } = require('@deity/falcon-server');
+ const { Events } = require('@deity/falcon-server-env');
```

### Falcon-Client 0.2.0

- Rename `client/razzle.config.js` to `client/falcon-client.build.config.js`
```diff
- const { razzlePluginFalconClient } = require('@deity/falcon-client');

module.exports = {
-  plugins: [
-    razzlePluginFalconClient({
-      i18n: {
-        resourcePackages: ['@deity/falcon-i18n'],
-        filter: { lng: ['en'] }
-      }
-    })
-  ]
+  clearConsole: true,
+  useWebmanifest: true,
+  i18n: {
+    resourcePackages: ['@deity/falcon-i18n'],
+    filter: { lng: ['en'] }
+  }
};
```
