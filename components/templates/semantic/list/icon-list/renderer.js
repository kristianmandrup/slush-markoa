var template = require('./template.marko');

exports.renderer = function(input, out) {
  // console.log('list', input);
  template.render(input, out);
};
