var template = require('./template.marko');

exports.renderer = function(input, out) {
  input.active = input.active ? 'active' : '';
  template.render(input, out);
};
