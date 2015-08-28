Build Tasks
===========

### Stylus

Use `gulp stylus` to compile stylus files in `/styles` to `/dist/css`

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
