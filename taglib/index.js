/*jslint node: true */
'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    chalk     = require('chalk-log');

module.exports = function() {
    return function (done) {
        var prompts = [{
            name: 'taglibName',
            message: 'What is the name of your taglib or taglibs (, separated) ?',
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
                if (_.isBlank(answers.taglibName)) {
                  chalk.error('Taglib name can NOT be empty');
                  done();
                }
                answers.taglibName = _.clean(answers.taglibName);
                var appPath = path.join('./apps', answers.appName);
                var targetDir = _.isBlank(answers.appName) ? './apps/_global' : appPath;

                var createTagLib = require('./create-taglib');

                if (answers.taglibName.match(/,/)) {
                  var taglibs = answers.taglibName.split(',').map(function(taglib) {
                      return _.clean(taglib);
                  });
                  for (let taglib of taglibs) {
                    answers = {taglibName: taglib, appName: answers.appName};
                    createTagLib(answers, targetDir);
                  }
                } else {
                  createTagLib(answers, targetDir);
                }
            }
        );
    };
};
