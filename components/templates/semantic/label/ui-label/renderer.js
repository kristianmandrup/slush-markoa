var template = require('./template.marko');

exports.renderer = function(input, out) {
    input.isTag = input.tag ? 'tag' : '';
    input.isRibbon = input.ribbon ? 'ribbon' : '';
    input.isAttached = input.attached ? 'attached' : '';
    input.float = input.float ? 'floating' : '';
    input.circular = input.circular ? 'circular' : '';
    template.render(input, out);
};
