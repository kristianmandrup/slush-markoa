var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

module.exports = function(defaults) {
    return function (done) {
        var prompts = require('./prompts')(defaults);
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }

                // run `npm install --save` and `npm install --save-dev`

                // dev dependencies
                // "nib": "^1.1.0",
                // "rupture": "^0.6.1",
                // "jeet": "^6.1.2",
                // "jade-markoa": "^0.1.0",
                // "autoprefixer-stylus": "^0.7.1",
                // "axis": "^0.4.2",
                // "fluidity": "^0.2.3",
                // "client-templates": "^0.2.0",

                // dependencies
                // "roots": "^3.2.2",
                // TODO: some of the packs below are auto included by ROOTS!!!

                // "semantic-ui": "^2.0.7",
                // "stylus": "0.51.x",
                // "sugar": "^1.4.1",
                // "coffee-script": "1.9.x",
                // "css-pipeline": "0.2.x",
                // "font-awesome": "^4.4.0",
                // "gulp": "^3.9.0",
                // "gulp-autoprefixer": "^2.3.1",
                // "js-pipeline": "0.2.x",
                // "jstransformer-marked": "0.0.x",
                // "jade": "^1.11.0",
                // "jquery": "^2.1.4",


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
