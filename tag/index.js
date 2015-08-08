'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    chalk     = require('chalk-log');

module.exports = function() {
    return function (done) {
        var prompts = [{
            name: 'tagName',
            message: 'What is the name of your tag or tags (, separated) ?',
        }, {
            name: 'appName',
            message: 'For which app (empty: global) ?'
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
                if (_.isBlank(answers.tagName)) {
                  chalk.error('Tag name can NOT be empty');
                  done();
                }
                answers.appName = _.clean(answers.appName);
                var targetDir = _.isBlank(answers.appName) ? './apps/_global' : path.join('./apps', answers.appName);

                var createTag = require('./create-tag');

                if (answers.tagName.match(/,/)) {
                  var tags = answers.tagName.split(',').map(function(tag) {
                      return _.clean(tag);
                  })
                  for (let tag of tags) {
                    var answers = {tagName: tag, appName: answers.appName}
                    createTag(answers, targetDir);
                  }
                } else {
                  createTag(answers, targetDir);
                }
            }
        );
    }
}
