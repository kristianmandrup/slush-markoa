'use strict';

var _ = require('underscore.string');
var createTag = require('./create-tag');

module.exports = function(answers, tagObj, done) {
  if (_.isBlank(answers.tagName)) {
    chalk.error('Tag name can NOT be empty');
    done();
  }
  answers.appName = _.clean(answers.appName);
  var targetDir = _.isBlank(answers.appName) ? './apps/_global' : path.join('./apps', answers.appName);

  var createTag = require('./create-tag');

  if (answers.tagName.match(/,/)) {
    var tags = answers.tagName.split(',').map(function(tag) {
      return _.clean(tag);
    });

    for (let tag of tags) {
      var answers = {tagName: tag, appName: answers.appName}
      createTag(answers, tagObj, targetDir, function() {
      });
    }
    done();
  } else {
    createTag(answers, tagObj, targetDir, function() {
      done();
    });
  }
}
