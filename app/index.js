/*jslint node: true */
'use strict';

/*
 * slush-markoa
 * https://github.com/kristianmandrup/slush-markoa
 *
 * Copyright (c) 2015, Kristian Mandrup
 * Licensed under the MIT license.
 */

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    chalk = require('chalk-log');

module.exports = function() {
    return function (done) {
        var prompts = [{
            name: 'appName',
            message: 'What is the name of your app?',
        }, {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }];

        chalk.ok('Compile your new app by running:');
        chalk.log('gulp jade:marko');

        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }
                if (_.isBlank(answers.appNameSlug)) {
                  done();
                }
                answers.appNameSlug = _.slugify(answers.appName);

                gulp.src(__dirname + '/templates/**')
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if (file.basename.match(/^app/)) {
                            file.basename = file.basename.replace(/^app/, answers.appName);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./apps/' + answers.appNameSlug))
                    .pipe(install())
                    .on('end', function () {
                      done();
                    });
            }
        );
    };
};
