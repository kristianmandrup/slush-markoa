'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    chalk     = require('chalk-log');

module.exports = function() {
    // TODO: Ask if it should be a Stateful widget etc.
    // More prompts for refinement of widget, thanks :)
    return function (done) {
        var prompts = [{
            name: 'widgetName',
            message: 'What is the name of your widget or widgets (, separated) ?',
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
                if (_.isBlank(answers.widgetName)) {
                  chalk.error('Widget name can NOT be empty');
                  done();
                }
                answers.appName = _.clean(answers.appName);
                var targetDir = _.isBlank(answers.appName) ? './apps/_global' : path.join('./apps', answers.appName);

                var createWidget = require('./create-widget');

                if (answers.widgetName.match(/,/)) {
                  var widgets = answers.widgetName.split(',').map(function(widget) {
                      return _.clean(widget);
                  })
                  for (let widget of widgets) {
                    var answers = {widgetName: widget, appName: answers.appName}
                    createWidget(answers, targetDir);
                  }
                } else {
                  createWidget(answers, targetDir);
                }
            }
        );
    }
}
