'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    chalk     = require('chalk-log');

var doTag = require('./do-tag');

module.exports = function() {
    return function (done) {
        var prompts = [{
            name: 'tagName',
            message: 'What is the name of your tag or tags (, separated) ?',
        }, {
            name: 'appName',
            message: 'For which app (empty: global) ?'
        }, {
            name: 'attributeNames',
            message: 'What are the attributes used by the tag (, separated) ?'
        }, {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }];
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }

                var attributes = [];
                for (let name of attributeNames) {
                  itemTag(name, function(attribute) {
                    attributes.push(attribute);
                  });
                  let tag = new Tag(attributes);
                  doTag(answers, tag, function() {
                    done();
                  })
                }
            }
        );
    }
}
