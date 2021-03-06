module.exports = function(defaults) {
  var stylusPlugins = ['autoprefixer', 'axis', 'nib', 'rupture',
    'typographic', 'fluidity', 'jeet', 'poststylus'
  ];

  var postCssPlugins = ['clearfix',
    'responsive-type', 'position',
    'rucksack', 'lost'
  ];

  return  [{
      name: 'stylusPlugins',
      type: 'checkbox',
      message: 'Which stylus plugins do you which to enable?',
      choices: stylusPlugins,
      default: stylusPlugins
  }, {
    name: 'postCssPlugins',
    type: 'checkbox',
    message: 'Which postcss plugins do you which to enable?',
    choices: postCssPlugins,
    default: postCssPlugins
  }, {
      type: 'confirm',
      name: 'sass',
      message: 'You want SASS (SCSS) support as well?',
      default: false
  }, {
      type: 'confirm',
      name: 'installDeps',
      message: 'You want to auto-install dev dependencies?',
      default: false
  }, {
      type: 'confirm',
      name: 'browserSync',
      message: 'You want to install browser sync?',
      default: false
  }, {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
  }];
}
