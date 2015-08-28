'use strict';

var extend = require('extend');
var Tag = require('../tag');

var ListTag = function(props, attributes) {
  this.attributes = attributes;
  this.name = props.name;
  this.tagName = props.tagName;
}

var JadeTemplate = function(tag) {
  this.tag = tag;
}

JadeTemplate.prototype = {
  container: function() {
    return "div(class='ui " + this.tag.name + "')";
  },
  loop: function() {
    return "for(each='item in " + this.tag.name + "')";
  },
  item: function() {
    return this.tag.tagName + "(attrs='item')";
  },
  template: function() {
    return this.container() + '\n  ' + this.loop() + '\n    ' + this.item();
  }
}

var MarkoTemplate = function(tag) {
  this.tag = tag;
}

MarkoTemplate.prototype = {
  container: function() {
    return "<div class='ui " + this.tag.name + "'>";
  },
  loop: function() {
    return "<for each='item in " + this.tag.name + "'>";
  },
  item: function() {
    return '<' + this.tag.tagName + " attrs='item'/>";
  },
  endTags: function() {
    return '  </for>\n</div>';
  },
  template: function() {
    return this.container() + '\n  ' + this.loop() + '\n    ' + this.item() + this.endTags();
  }
}

ListTag.prototype = {};

var ListTemplating = {
  jadeTemplate: function() {
    return new JadeTemplate(this).template();
  },
  markoTemplate: function() {
    return new MarkoTemplate(this).template();
  }
}

extend(ListTag.prototype, Tag.prototype, ListTemplating);

module.exports = ListTag;
