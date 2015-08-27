'use strict';

var inquirer  = require('inquirer');
var ListTag = require('./index');

module.exports = function(attributes, done) {
  var prompts = require('./prompts');
  var defaults = {
  };
  inquirer.prompt(prompts(defaults),
    function (answers) {
      var tag = new ListTag(answers, attributes);
      done(tag);
    }
  );
}
