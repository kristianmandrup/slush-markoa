### Stylus

Use `gulp stylus` to compile stylus files in `/styles` to `/dist/css`

### Stylus plugins

To enable your Stylus plugins of choice, you must (currently):

### Enable plugins in Gulp compilation

In `build/tasks/stylus.js`

-	require the plugins you wish to enable as part of your compilation
-	populate the stylusPlugins variable in .

```js
var jeet = require('jeet');
// ...
var stylusPlugins = [jeet()];
```

A list of available plugins are commented out and can be used.

### Import plugins into your Stylus stylesheet file

In your `styles/app.styl` file

-	import the plugins you wish to use in your Stylus file: `app.styl`.

```stylus
// JEET
@import 'jeet'
```
