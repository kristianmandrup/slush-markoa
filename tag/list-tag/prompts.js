'use strict';

module.exports = function(defaults) {
  defaults.name = defaults.name || 'list';
  var prompts = [{
      name: 'name',
      message: 'What is the list attribute name ?',
      default: defaults.name
  }, {
      name: 'tagName',
      message: 'What tag should be used for each list item ?',
      default: defaults.tagName
  }];
  return prompts;
}
