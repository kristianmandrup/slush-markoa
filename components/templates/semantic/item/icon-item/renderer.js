var template = require('./template.marko');

exports.renderer = function(input, out) {
  input.align = input.align || 'middle';
  template.render(input, out);
};
