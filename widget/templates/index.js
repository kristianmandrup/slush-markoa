module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    getTemplateData: function(state, input) {
        return {
            name: input.name || 'unknown name'
        };
    },

    init: function() {
        var el = this.el; // The root DOM element that the widget is bound to
        console.log('Initializing widget: ' + el.id);
    }
});
