var Attribute = function(attribute) {
  this.attribute = attribute;
}

Attribute.prototype = {
  preRenderStatement: function() {
    if (this.default) {
      var fullName = 'input.' + this.name;
      return fullName + ' = ' fullName + ' || ' + this.convertedDefault();
    }
    return undefined;
  },

  convertedDefault: function() {
    var value = this.default;
    switch (this.type) {
      case 'number': return Number(value);
      case 'date': return Date.parse(value);
      case 'array': return value.split(',');
      case 'boolean':
        return (['true', 'yes'].indexOf(value) >= 0) ? true : false;
      default: return value;
    }
  }
}


module.exports = Attribute;
