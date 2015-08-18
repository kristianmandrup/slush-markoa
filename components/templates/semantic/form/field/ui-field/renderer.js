var template = require('./template.marko');

exports.renderer = function(input, out) {
  input.type = input.type || 'text';
  template.render(input, out);
};
