var template = require('./template.marko');

exports.renderer = function(input, out) {
  input.hasContent = input.label || input.desc
  template.render(input, out);
};
