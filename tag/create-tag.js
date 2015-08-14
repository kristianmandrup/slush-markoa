var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    path = require('path'),
    chalk = require('chalk-log');

var writer = require('./writer');
var jsonfile = require('jsonfile')

module.exports = function(answers, targetDir) {
  var compFileName = answers.tagName;
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

  answers.tagNameSlug = _.slugify(compFileName);
  if (!answers.tagNameSlug.match(/-/)) {
      if (subFoldersPath.length) {
        answers.tagNameSlug = [subFolders[subFolders.length -1], answers.tagNameSlug].join('-');
      } else {
        chalk.error('Tag name must be of the form  xx-yyy, was:' + answers.tagNameSlug);
        return done();
      }
  }
  var componentsDir = path.join(targetDir, 'components');
  var tagSubFolder = path.join(componentsDir, subFoldersPath)
  var dest = path.join(tagSubFolder, answers.tagNameSlug);

  if (!_.isBlank(subFoldersPath)) {
    // create taglib for sub-folder
    gulp.src(__dirname + '/special/**')
        .pipe(template(answers))
        .pipe(conflict('./'))
        .pipe(gulp.dest(tagSubFolder))
        .pipe(install())
    // "./menu/marko-taglib.json"
    var importStr = '\"taglib-imports\": [\".\/menu\/marko-taglib.json\"]'
    var parentTagLibFile = path.join(componentsDir, 'marko-taglib.json');

    // chalk.log('---------------------------------------------------------------------------------')
    // chalk.note('Please insert entry in: ' + parentTagLibFile);
    // chalk.ok(importStr);
    // chalk.log('---------------------------------------------------------------------------------')
    var fullParentTagLibFile = './' + parentTagLibFile;
    var tagLibObj = {}
    try {
       tagLibObj = jsonfile.readFileSync(fullParentTagLibFile);
    } cacth (e) {
      console.warn('missing taglib: ' + fullParentTagLibFile);      
    }

    tagLibObj['taglib-imports'] = tagLibObj['taglib-imports'] || [];
    var importLib = "./menu/marko-taglib.json";
    if (tagLibObj['taglib-imports'].indexOf(importLib) < 0)
      tagLibObj['taglib-imports'].push(importLib);
    writer.toJsonFile(fullParentTagLibFile, tagLibObj)
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
