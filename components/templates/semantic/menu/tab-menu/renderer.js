var template = require('./template.marko');

exports.renderer = function(input, out) {
  input.ui = input.ui + ' tabluar';
  template.render(input, out);
};
