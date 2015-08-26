/*
 * slush-markoa
 * https://github.com/kristianmandrup/slush-markoa
 *
 * Copyright (c) 2015, Kristian Mandrup
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    path = require('path');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

    if (process.platform === 'win32') {
        homeDir = process.env.USERPROFILE;
        osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
    }
    else {
        homeDir = process.env.HOME || process.env.HOMEPATH;
        osUserName = homeDir && homeDir.split('/').pop() || 'root';
    }

    configFile = path.join(homeDir, '.gitconfig');
    user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        appName: workingDirName,
        userName: osUserName || format(user.name || ''),
        authorName: user.name || '',
        authorEmail: user.email || ''
    };
})();

let tasks = {};
tasks.default = require('./default')(defaults);
gulp.task('default', tasks.default);

console.log('slush-markoa v.0.3.9');

// 'components'
for (let name of ['app', 'state', 'tag', 'taglib', 'roots', 'layout', 'widget']) {
  tasks[name] = require('./' + name)();
  gulp.task(name, tasks[name]);
}
