module.exports = {
  find: function(widgetName, appName) {
    let widgetDir = path.join('./apps', appName || '_global', 'components', widgetName);
    return require(widgetDir);
  }
}
