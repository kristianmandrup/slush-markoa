module.exports = {
  mounter: function(appContainer, opts) {
    let markoa = require('markoa');
    opts = opts || {rootPath: __dirname};
    let appConfigurator = new markoa.appConfigurator(appContainer, opts);

    return function (apps) {
      return appContainer.mountApps(apps).createRoutes().start();
    }
  }
}
