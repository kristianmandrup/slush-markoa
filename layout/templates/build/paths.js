// TODO: use path.join instead of +
var path = require('path');

var root = {
  app: 'src',
  apps: 'apps',
  output: 'dist',
  styles: 'styles'
}

module.exports = {
  root: root.app,
  source: path.join(root.app, '**/*.js'),
  css: path.join(root.styles, 'css/**/*.css'),
  stylus: path.join(root.styles, '**/*.styl'),
  jade: path.join(root.apps, '**/*.jade'),
  styles: root.styles,
  stylesDist: path.join(root.output, 'css'),
  output: root.output,
  dist: root.output,
  sourceMapRelativePath: '../' + root.app,
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
