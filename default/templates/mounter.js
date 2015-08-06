module.exports = function(appConfigurator) {
  return {
    mount: function(apps) {
      appConfigurator.mountApps(apps);
    }
  }
}
