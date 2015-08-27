'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    chalk     = require('chalk-log');

var doTag = require('./do-tag');
var createListTag = require('./list-tag/create');
var createAttribute = require('./attribute/create');

function buildAttributes(done) {
  var attributes = [];
  for (let name of attributeNames) {
    createAttribute(function(attribute) {
      attributes.push(attribute);

      if (name === attributeNames[attributeNames.length -1])
        done(attributes);
    });
  }
}

function buildTag(answers, attributes, done) {
  if (!answers.listTag) {
    var Tag = require('./tag');
    done(new Tag(attributes));
    return;
  }

  createListTag(function(tag) {
    done(tag)
  });
}



module.exports = function() {
    return function (done) {
        let prompts = require('./prompts');
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
              if (!answers.moveon) {
                return done();
              }

              buildAttributes(function(attributes) {
                buildTag(answers, attributes, function(tag) {
                  doTag(answers, tag, function() {
                    done();
                  })
                });
              })
            }
        );
    }
}
