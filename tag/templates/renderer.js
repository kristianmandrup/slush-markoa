var template = require('./template.marko');

exports.renderer = function(input, out) {
  <%= preRenderStatement %>  
  template.render(input, out);
};
