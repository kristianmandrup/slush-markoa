var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path'),
    chalk = require('chalk-log');

function isEmpty(str) {
    return (!str || str.length === 0);
}

module.exports = function() {
    return function (done) {
        var prompts = [{
            name: 'tagName',
            message: 'What is the name of your tag?',
        }, {
            name: 'appName',
            message: 'For which app (empty: global)?'
        }, {
            type: 'confirm',
            name: 'moveon',
            message: 'Continue?'
        }];
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                console.log('answers', answers);
                if (!answers.moveon) {
                    return done();
                }
                if (isEmpty(answers.tagName)) done();

                answers.tagNameSlug = _.slugify(answers.tagName);
                if (!answers.tagNameSlug.match(/-/)) {
                  chalk.error('Tag name must be of the form  xx-yyy, was:' + answers.tagNameSlug);
                  return done();
                }

                answers.tagNamePretty = _.humanize(answers.tagName);
                var target = answers.appName ? path.join('./apps', answers.appName) : './apps/_global';
                var dest = path.join(target, 'components', answers.tagNameSlug);
                gulp.src(__dirname + '/templates/**')
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        if (file.basename[0] === '_') {
                            file.basename = '.' + file.basename.slice(1);
                        }
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest(dest))
                    .pipe(install())
                    .on('end', function () {
                        done();
                    });
            }
        );
    }
}
