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
        chalk.ok('Make this your first line in: apps/_global/layouts/layout.jade')
        chalk.log('lasso-page(name="$data.name" package-path="./${data.name}.browser.json")')

        chalk.ok('Make this your first line in: apps/_global/hello-you/template.jade')
        chalk.log('strong $data.label');

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
