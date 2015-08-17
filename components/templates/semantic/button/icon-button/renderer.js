var template = require('./template.marko');

exports.renderer = function(input, out) {
  input.align = input.align || 'left';
  input.labeled = input.label ? 'labeled' : '';
  template.render(input, out);
};
