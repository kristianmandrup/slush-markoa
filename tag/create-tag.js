'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk-log');

var jsonfile = require('jsonfile')

module.exports = function(answers, tagObj, targetDir, done) {
  var compFileName = answers.tagName;
  var subFoldersPath = '';
  var subFolders = [];

  // use the Tag object!!!
  if (tagObj) {
    answers.tagSchema = tagObj.jsonSchema();
    answers.preRenderStatement = tagObj.preRenderStatements();
    answers.jadeTemplate = tagObj.jadeTemplate();
  } else {
    answers.tagSchema = '{}';
    answers.jadeTemplate = 'strong ' + answers.tagName;
    answers.preRenderStatement = '// pre-render logic here...';
  }

  //sub folder
  var splits = compFileName.split(':');
  if (splits.length > 0) {
    var last = splits.length -1;
    compFileName = splits.slice(last);
    subFolders = splits.slice(0, last);
    subFoldersPath = subFolders.join('/');
  }

  answers.tagNameSlug = _.slugify(compFileName);
  if (!answers.tagNameSlug.match(/-/)) {
      if (subFoldersPath.length) {
        var lastFolderName = subFolders[subFolders.length -1];
        answers.tagNameSlug = [answers.tagNameSlug, lastFolderName].join('-');
      } else {
        chalk.error('Tag name must be of the form  xx-yyy, was:' + answers.tagNameSlug);
        return done();
      }
  }
  var componentsDir = path.join(targetDir, 'components');
  var tagSubFolder = path.join(componentsDir, subFoldersPath);
  var dest = path.join(tagSubFolder, answers.tagNameSlug);

  var importPath = path.join('./', subFoldersPath);

  if (!_.isBlank(subFoldersPath)) {
    // create taglib for sub-folder
    gulp.src(__dirname + '/special/**')
        .pipe(template(answers))
        .pipe(conflict('./'))
        .pipe(gulp.dest(tagSubFolder))
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
    var importLib = './' + importPath + '/marko-taglib.json';

    if (tagLibObj['taglib-imports'].indexOf(importLib) < 0) {
      tagLibObj['taglib-imports'].push(importLib);
      tagLibObj['taglib-imports'].sort();
      jsonfile.writeFileSync(fullParentTagLibFile, tagLibObj, {spaces: 4})
    }
  }

  answers.tagNamePretty = _.humanize(answers.tagName);
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
