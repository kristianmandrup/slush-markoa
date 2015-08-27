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
    return JSON.stringify(this.schema());
  },
  sampleJadeTemplate: function() {
    var tag = '';
    this.attributes.map(function(att) {
      return 'strong '  + att.name + ': $data.' + att.name;
    });
    return tag;
  },
  sampleMarkoTemplate: function() {
    var tag = '';
    this.attributes.map(function(att) {
      return '<strong>'  + att.name + ': $data.' + att.name + '</strong>';
    });
    return tag;
  }
}


module.exports = Tag;
