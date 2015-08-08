module.exports = function(defaults) {
  return  [{
      name: 'stylusPlugins',
      type: 'checkbox',
      message: 'Which stylus plugins do you which to enable?',
      choices: ['axis', 'rupture', 'autoprefixer', 'jeet'],
      default: ['axis', 'rupture', 'autoprefixer']
  }, {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
  }];
}
