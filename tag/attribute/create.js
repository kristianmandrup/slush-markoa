'use strict';

var chalk     = require('chalk-log');
var inquirer  = require('inquirer');
var Attribute = require('./index');
require('sugar');

module.exports = function(name, done) {
  var prompts = require('./prompts');
  name = name.compact();
  var defaults = {
    type: 'string'
  };
  chalk.clear();
  chalk.note('Attribute:' + name.compact());
  inquirer.prompt(prompts(defaults),
    function (answers) {
      var attribute = new Attribute(answers, name);
      done(attribute);
    }
  );
}
