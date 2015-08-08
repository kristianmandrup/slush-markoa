module.exports = {
  create: function(appContainer, apps, opts) {
    return {
      mount: function() {
        this.mounter().mount(apps, opts);
      },
      mounter: function() {
        return new Mounter(appContainer, opts)
      }
    }
  },
  mount: function(appContainer, apps, opts) {
    this.mounter(appContainer, opts).mount(apps);
  },
  mounter: function(appContainer, opts) {
    return new Mounter(appContainer, opts)
  },
  mountIn: function(appContainer, apps) {
    return appContainer.mount.apps(app);
  }
}
