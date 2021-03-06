Build Tasks
===========

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

#### Stylus watch and auto-compile

Use `gulp stylus:watch` to watch stylus files and auto-compile. Can also be enabled via `gulp watch`.

### Sass

Use `gulp sass` to compile sass/scss files in `/styles` to `/dist/css`

#### Sass watch and auto-compile

Use `gulp sass:watch` to watch stylus files and auto-compile. Can also be enabled via `gulp watch`.

### BrowserSync and Auto-compile

In order for compiled templates and styles to be picked up by the browser, you must:

-	Run `browser-refresh .`
-	Run `gulp watch`

Each must be run in a separate Terminal tab (and process)
