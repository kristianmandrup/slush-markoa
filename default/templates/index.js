module.exports = {
  mounter: function() {
    let markoa = require('markoa');
    let appConfigurator = new markoa.appContainer.configurator(__dirname);
    return require('./mounter')(appConfigurator);
  },
  appConfigs: function(apps) {
    apps = apps || this.defaultApps;
    return this.mounter().mount(apps).appConfigs;
  }
  defaultApps: [],
  mountIn: function(appContainer, apps) {
    return appContainer.mount.configs(this.appConfigs(apps));
  }
}
