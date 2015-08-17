var template = require('./template.marko');

exports.renderer = function(input, out) {
    input.label = input.label || 'search'
    template.render(input, out);
};
