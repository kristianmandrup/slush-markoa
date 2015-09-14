/*jslint node: true */
'use strict';

module.exports = {
  post: function*(next) {
    console.log('POST');
    yield next;
  },
  update: function*(next) {
    console.log('UPDATE');
    yield next;
  }
};
