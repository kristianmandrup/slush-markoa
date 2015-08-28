'use strict';

module.exports = function(defaults) {
  defaults = defaults || {};
  var prompts = [{
      name: 'tagName',
      message: "What is the name of your tag ?",
      default: defaults.name
  }, {
      name: 'appName',
      message: 'For which app (empty: global) ?'
  }, {
      name: 'attributeNames',
      message: 'What are the attributes used by the tag (, separated) ?'
  }, {
      type: 'confirm',
      name: 'listTag',
      message: 'Is this a list tag ?',
      default: false
  }, {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
  }];
  return prompts;
}
