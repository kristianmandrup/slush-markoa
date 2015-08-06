var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

function isEmpty(str) {
    return (!str || str.length === 0);
}

module.exports = function(defaults) {
    return function (done) {
        var prompts = [{
            name: 'appName',
            message: 'What is the name of your project?',
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
                if (isEmpty(answers.appNameSlug)) done();
                answers.appNameSlug = _.slugify(answers.appName);              
                gulp.src(__dirname + '/templates/**')
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
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
    }
}
