'use strict';

var inquirer  = require('inquirer');
var Attribute = require('./attribute');

module.exports = function(done) {
  var prompts = require('./attribute/prompts');
  var defaults = {
    types: ['string', 'list', 'number', 'boolean', 'date']
  };

  inquirer.prompt(prompts(defaults),
    function (answers) {
      var attribute = new Attribute(answers);
      done(attribute);
    }
  );
}
