var template = require('./template.marko');

exports.renderer = function(input, out) {
    input.divider = input.divider || '/'
    template.render(input, out);
};
