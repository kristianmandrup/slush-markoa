'use strict';
// {
//     name: 'name',
//     message: 'What is the name of your attribute?'
// },

module.exports = function(defaults) {
  var types = ['string', 'array', 'number', 'boolean', 'date']

  var prompts = [{
      name: 'type',
      type: 'list',
      message: 'What is the data type ?',
      choices: types,
      default: defaults.type
  }, {
      name: 'default',
      message: 'What is the default value?'
  }];
  return prompts;
}
