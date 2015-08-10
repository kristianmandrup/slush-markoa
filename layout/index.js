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

var util = require('util');

let pluginMap = {
  autoprefixer: 'autoprefixer-stylus'
};

module.exports = function(defaults) {
    return function (done) {
        var prompts = require('./prompts')(defaults);
        //Ask
        inquirer.prompt(prompts,
            function (answers) {
                if (!answers.moveon) {
                    return done();
                }
                let stylusModules = answers.stylusPlugins.map(function(name) {
                  return pluginMap[name] || name;
                })

                let modules = ['jade-marko', 'sugar'];
                for (let name of stylusModules)
                  modules.push(name);
                let npmModules = modules.join(' ');
                let npmInstall = ['npm install', npmModules, '--save-dev'].join(' ');

                chalk.log(npmInstall);
                chalk.ok('warming up...');
                var spawnCommand = require('spawn-command');
                var installCommand = spawnCommand(npmInstall);

                installCommand.stdout.on('data', function (data) {
                  console.log('data', data.toString());
                });

                installCommand.on('exit', function (exitCode) {
                  if (exitCode !== 0) done();

                  chalk.ok('Semantic UI');
                  chalk.log('npm install semantic-ui');

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
                });

            }
        );
    }
}
