# Upgrade notes

**Note:** This is a cumulative upgrade notes file, that provides detailed instructions
on how to migrate your previously generated Falcon-based project to a newer version.

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
