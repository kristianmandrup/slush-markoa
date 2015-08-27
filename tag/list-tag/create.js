'use strict';

var inquirer  = require('inquirer');
var ListTag = require('./index');

function firstArrayType(attributes) {
  return attributes.find(function(att) {
    return att.type === 'array';
  });
}

module.exports = function(attributes, done) {
  var prompts = require('./prompts');
  var listAttrib = firstArrayType(attributes) || {};
  var defaults = {
    name: listAttrib.name || 'list'
  };
  inquirer.prompt(prompts(defaults),
    function (answers) {
      var tag = new ListTag(answers, attributes);
      done(tag);
    }
  );
}
