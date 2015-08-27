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
    chalk = require('chalk-log');

var util = require('util');

let pluginMap = {
  autoprefixer: 'autoprefixer-stylus',
  clearfix: 'postcss-clearfix',
  'responsive-type': 'postcss-responsive-type',
  position: 'postcss-position',
  rucksack: 'rucksack-css'
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

                let postCssModules = answers.postCssPlugins.map(function(name) {
                  return pluginMap[name] || name;
                })

                let modules = [];
                // poststylus = require('poststylus');
                let deps = ['gulp-stylus', 'stylus', 'gulp-watch', 'gulp-sourcemaps'];
                if (answers.installDeps) {
                  modules = deps;
                  if (answers.sass) {
                    modules.push('gulp-sass');
                  }
                } else {
                  chalk.note('Skipped npm install:');
                  chalk.log(deps.join(' '));
                  if (answers.sass) {
                    chalk.log('gulp-sass');
                  }
                }

                if (answers.browserSync) {
                  modules.push('koa-browser-sync');
                }

                for (let name of stylusModules)
                  modules.push(name);

                for (let name of postCssModules)
                  modules.push(name);

                let npmModules = modules.join(' ');
                let npmInstall = ['npm install', npmModules, '--save-dev'].join(' ');

                chalk.log(npmInstall);
                chalk.ok('warming up...');
                var spawnCommand = require('spawn-command');
                var installCommand = spawnCommand(npmInstall);

                installCommand.stdout.on('data', function (data) {
                  console.log(data.toString());
                });

                installCommand.on('exit', function (exitCode) {
                  if (exitCode !== 0) done();

                  chalk.ok('Install Semantic UI:');
                  chalk.log('npm install semantic-ui --save');

                  chalk.note('Then build it:');
                  chalk.log('cd semantic && gulp build');

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
