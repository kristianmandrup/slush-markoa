var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    chalk = require('chalk-log'),
    path = require('path');

module.exports = function(defaults) {
    return function (done) {
        chalk.ok('Compile your app by running:')
        chalk.log('gulp jade:marko');

        var prompts = require('./prompts')(defaults);
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }
                if (_.isBlank(answers.appNameSlug)) done();
                answers.appNameSlug = _.slugify(answers.appName);

                answers.lassoPage = 'lasso-page(name="$data.name" package-path="./${data.name}.browser.json")';

                gulp.src(__dirname + '/templates/**')
                    .pipe(template(answers))
                    .pipe(rename(function (file) {
                        // see https://github.com/wearefractal/vinyl
                        if (file.basename[0] === '_') {
                            if (file.basename !== '_global')
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
