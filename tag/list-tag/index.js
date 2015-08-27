var ListTag = function(props, attributes) {
  this.attribute = attribute;
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

module.exports = ListTag;
