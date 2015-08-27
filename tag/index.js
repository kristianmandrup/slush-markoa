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

module.exports = function() {
    return function (done) {
        let prompts = require('./prompts');
        //Ask
        inquirer.prompt(prompts,
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
