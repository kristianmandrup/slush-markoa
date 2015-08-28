App mounting
------------

An app can be mounted on an App container via `mount/self.js`.

The `index.js` of this project uses it by default.

`module.exports = require('./mount/self');`

To mount the app and export it... Whichever module import this module can then mounted the app on a Koa app via [koa-mount](https://github.com/koajs/mount).
