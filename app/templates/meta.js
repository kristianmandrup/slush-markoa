/*jslint node: true */
'use strict';

module.exports = {
  type: 'landing', // any of: landing, list, item, ...
  // form: true, // if it contains a form to edit the item
  page: {
    // type: 'item',
    // app: 'item', // app to use if no page here
    // pages: 'inherit' // use basic template inheritance
    // pages: { // custom template inheritance rules
    // }
  },
  data: {
    // type: 'item',
    // app: 'item' app to use if no data here
  }
};
