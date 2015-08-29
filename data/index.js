'use strict';

var _         = require('underscore.string'),
    inquirer  = require('inquirer'),
    path      = require('path'),
    chalk     = require('chalk-log');

module.exports = function() {
    return function (done) {
        var prompts = [{
            name: 'where',
            message: 'for which app (empty is global)?',
            default: ''
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
                require('./create-state')(answers);
            }
        );
    }
}
