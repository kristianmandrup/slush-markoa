var template = require('./template.marko');

exports.renderer = function(input, out) {
    // TODO: handle data.icon.size
    template.render(input, out);
};