'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    chalk     = require('chalk-log');

module.exports = function() {
    return function (done) {
        var prompts = [{
            type: 'list',
            name: 'uiFramework',
            choices: ['Semantic UI'],
            message: 'Which UI framework ?',
            default: 'Semantic UI'
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
                require('./create-components')(answers);
            }
        );
    }
}
