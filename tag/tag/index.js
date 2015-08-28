'use strict';

var Tag = function(attributes) {
  this.attributes = attributes;
}

Tag.prototype = {
  preRenderStatements: function() {
    var tag = '';
    this.attributes.map(function(att) {
      return att.preRenderStatement();
    });
    return tag;
  },
  schema: function() {
    var schema = {};
    for (let attrib of this.attributes) {
      var key = '@' + attrib.name;
      schema[key] = attrib.type;
    }
    return schema;
  },
  jsonSchema: function() {
    return JSON.stringify(this.schema(), undefined, 4);
  },
  jadeTemplate: function() {
    var tags = this.attributes.map(function(att) {
      return 'strong '  + att.name + ': $data.' + att.name;
    });
    return tags.join('\n');
  },
  markoTemplate: function() {
    var tags = this.attributes.map(function(att) {
      return '<strong>'  + att.name + ': $data.' + att.name + '</strong>';
    });
    return tags.join('\n');
  }
}

module.exports = Tag;
