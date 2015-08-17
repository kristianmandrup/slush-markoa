var template = require('./template.marko');

exports.renderer = function(input, out) {
  input.align = input.align || 'left';
  template.render(input, out);
};
