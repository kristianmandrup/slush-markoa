var template = require('./template.marko');

exports.renderer = function(input, out) {
  input.type = input.type || 'text';
  input.isRequired = input.required ? 'required ' : '';
  template.render(input, out);
};
