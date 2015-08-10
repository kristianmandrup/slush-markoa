module.exports = function(defaults) {
  var pluginChoices = ['axis', 'nib', 'rupture', 'fluidity', 'autoprefixer', 'jeet'];
  return  [{
      name: 'stylusPlugins',
      type: 'checkbox',
      message: 'Which stylus plugins do you which to enable?',
      choices: pluginChoices,
      default: pluginChoices
  }, {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
  }];
}
