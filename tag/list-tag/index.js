'use strict';

var extend = require('extend');
var Tag = require('../tag');

var ListTag = function(props, attributes) {
  this.attributes = attributes;
  this.name = props.name;
  this.tagName = props.tagName;
}

ListTag.prototype = {
  container: function() {
    return "div(class='ui " + this.name + "')";
  },
  loop: function() {
    return "for(each='item in " + this.name + "')";
  },
  item: function() {
    return this.tagName + "(attrs='item')";
  },
  jadeTemplate: function() {
    return this.container() + '\n  ' + this.loop() + '\n    ' + this.item();
  }
}

extend(ListTag.prototype, Tag.prototype);

module.exports = ListTag;
