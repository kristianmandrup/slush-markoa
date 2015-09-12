/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk-log');

var jsonfile = require('jsonfile');

function prepareAnswers(tagObj, answers) {
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
  return answers;
}

function createTagLibs(answers, tagSubFolder, componentsDir, subFoldersPath) {
  var importPath = path.join('./', subFoldersPath);
  // create taglib for sub-folder
  gulp.src(__dirname + '/special/**')
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest(tagSubFolder))
      .pipe(install());

  var parentTagLibFile = path.join(componentsDir, 'marko-taglib.json');
  var fullParentTagLibFile = './' + parentTagLibFile;
  var tagLibObj = {};
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
    jsonfile.writeFileSync(fullParentTagLibFile, tagLibObj, {spaces: 4});
  }
}

function tagName(answers, compFileName, subFoldersPath, subFolders) {
  answers.tagNameSlug = _.slugify(compFileName);
  if (!answers.tagNameSlug.match(/-/)) {
      if (subFoldersPath.length) {
        var lastFolderName = subFolders[subFolders.length -1];
        answers.tagNameSlug = [answers.tagNameSlug, lastFolderName].join('-');
      } else {
        chalk.error('Tag name must be of the form  xx-yyy, was:' + answers.tagNameSlug);
        throw 'Bad tag name';
      }
  }
}

function gulpEm(answers, dest) {
  gulp.src(__dirname + '/templates/**')
      .pipe(template(answers))
      .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
              file.basename = '.' + file.basename.slice(1);
          }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest(dest))
      .pipe(install());
}

function decorate(folder) {
  //sub folder
  var splits = folder.compFileName.split(':');
  if (splits.length > 0) {
    var last = splits.length -1;
    folder.compFileName = splits.slice(last);
    folder.subFolders = splits.slice(0, last);
    folder.subFoldersPath = folder.subFolders.join('/');
  }
  return folder;
}

module.exports = function(answers, tagObj, targetDir, done) {
  try {
    var folder = {
      compFileName: answers.tagName,
      subFoldersPath: '',
      subFolders: []
    };
    answers = prepareAnswers(tagObj, answers);
    answers.tagNameSlug = tagName(answers, decorate(folder));

    var componentsDir = path.join(targetDir, 'components', 'tags');
    var tagSubFolder = path.join(componentsDir, folder.subFoldersPath);


    if (!_.isBlank(folder.subFoldersPath)) {
      createTagLibs(answers, tagSubFolder, componentsDir, folder.subFoldersPath);
    }

    answers.tagNamePretty = _.humanize(answers.tagName);
    var dest = path.join(tagSubFolder, answers.tagNameSlug);
    gulpEm(answers, dest);
  } catch (e) {
    return done();
  }
};
