'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    async     = require('async'),
    chalk     = require('chalk-log');

require('sugar');

var doTag = require('./do-tag');
var createListTag = require('./list-tag/create');
var createAttribute = require('./attribute/create');

function askAttribute(name, done) {
  createAttribute(name, function(attribute) {
    done(attribute)
  });
}

function buildAttributes(attributeNames, done) {
  let attributes = [];
  async.eachSeries(attributeNames, function (name, callback) {
    askAttribute(name, function(attribute){
      attributes.push(attribute);
      callback();
    });
  }, function (err) {
    if (err) throw err;
    done(attributes);
  });
}

function buildTag(answers, attributes, done) {
  if (!answers.listTag) {
    var Tag = require('./tag');
    done(new Tag(attributes));
    return;
  }

  createListTag(attributes, function(tag) {
    done(tag)
  });
}

module.exports = function(name) {
    return function (done) {
        var defaults = {
          name: name || ''
        };

        let prompts = require('./prompts');

        chalk.note("Note: tag name must have '-'. Use ':' for namespacing")
        //Ask
        inquirer.prompt(prompts(defaults),
            function (answers) {
              if (!answers.moveon) {
                return done();
              }

              var attributeNames = answers.attributeNames.split(',');
              attributeNames = attributeNames.compact();

              if (attributeNames.length) {
                buildAttributes(attributeNames, function(attributes) {
                  buildTag(answers, attributes, function(tag) {
                    doTag(answers, tag, function() {
                      done();
                    })
                  });
                })
              } else {
                doTag(answers, undefined, function() {
                  done();
                })
              }
            }
        );
    }
}
