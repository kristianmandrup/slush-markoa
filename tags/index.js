'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    chalk     = require('chalk-log'),
    async     = require('async');

require('sugar');

var makeTag = require('../tag');

module.exports = function() {
    return function (done) {
        let prompts = require('./prompts');
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
              if (!answers.moveon) {
                return done();
              }

              var tags = answers.tagNames.split(',').map(function(tag) {
                return _.clean(tag);
              });

              async.eachSeries(tags, function (name, callback) {
                var tagCreator = makeTag(name);
                chalk.progress('Tag: ' + name);
                tagCreator(function(done) {
                  callback();
                });
              }, function (err) {
                if (err) throw err;
                done();
              });
            }
        );
    }
}
