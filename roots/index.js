'use strict';
var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path'),
    chalk     = require('chalk-log');

module.exports = function(defaults) {
    return function (done) {
        var prompts = require('./prompts')(defaults);
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }
                var installs = {
                  globally: 'npm install roots -g',
                  dev: 'npm install nib rupture jeet jade-markoa gulp-autoprefixer autoprefixer-stylus axis fluidity client-templates jade through2 stylus --save-dev',
                  default: 'npm install roots semantic-ui sugar'
                };

                chalk.ok('Please install:');
                chalk.log(installs.globally);
                chalk.log(installs.default);
                chalk.log(installs.dev);

                gulp.src(__dirname + '/templates/**')
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .pipe(install())
                    .on('end', function () {
                        done();
                    });
            }
        );
    }
}
