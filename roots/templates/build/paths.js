// TODO: use path.join instead of +
var path = require('path');

var root = {
  app: 'src',
  output: 'dist',
  styles: 'public'
}

module.exports = {
  root: root.app,
  source: path.join(root.app, '**/*.js'),
  jadeSrc: path.join(root.app, 'views/templates/**/*.jade'),
  html: path.join(root.app, '**/*.html'),
  style: path.join(root.styles, 'css/**/*.css'),
  stylus: path.join(root.styles, 'stylus/**/*.styl'),
  jade: path.join(root.app, '**/*.jade');
  styleDest: path.join(root.output, 'styles/css'),
  output: root.output,
  sourceMapRelativePath: '../' + root.app,
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
