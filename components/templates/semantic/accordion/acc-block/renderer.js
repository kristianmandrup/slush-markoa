var template = require('./template.marko');

exports.renderer = function(input, out) {
    input.status = input.active ? 'active' : '';
    template.render(input, out);
};
