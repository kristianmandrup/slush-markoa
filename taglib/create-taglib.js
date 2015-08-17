var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    util = require('util'),
    chalk = require('chalk-log');

var jsonfile = require('jsonfile')

module.exports = function(answers, targetDir) {
  var compFileName = answers.taglibName;
  var subFoldersPath = '';
  var subFolders = [];

  //sub folder
  var splits = compFileName.split(':');
  if (splits.length > 0) {
    var last = splits.length -1;
    compFileName = splits.slice(last);
    subFolders = splits.slice(0, last);
    subFoldersPath = subFolders.join('/');
  }

  answers.taglibNameSlug = _.slugify(compFileName);
  if (subFoldersPath.length) {
    answers.taglibNameSlug = [subFolders[subFolders.length -1], answers.taglibNameSlug].join('-');
  }

  var componentsDir = path.join(targetDir, 'components');
  var tagSubFolder = path.join(componentsDir, subFoldersPath)
  var dest = path.join(tagSubFolder, answers.taglibNameSlug);

  console.log('Create marko taglib at:', dest);

  // create taglib folder with marko-taglib.json
  gulp.src(__dirname + '/templates/**')
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest(dest))
      .pipe(install())

  var parentTagLibFile = path.join(componentsDir, 'marko-taglib.json');

  var fullParentTagLibFile = './' + parentTagLibFile;
  var tagLibObj = {}
  try {
     tagLibObj = jsonfile.readFileSync(fullParentTagLibFile);
  } catch (e) {
    console.warn('missing taglib: ' + fullParentTagLibFile);
  }

  tagLibObj['taglib-imports'] = tagLibObj['taglib-imports'] || [];
  var importLib = './' + answers.taglibNameSlug + '/marko-taglib.json';

  if (tagLibObj['taglib-imports'].indexOf(importLib) < 0) {
    tagLibObj['taglib-imports'].push(importLib);
    jsonfile.writeFileSync(fullParentTagLibFile, tagLibObj, {spaces: 4})
  } // else already imported
}
