/*jslint node: true */
'use strict';

module.exports = {
  // nested apps
  // apps: require('./apps'),

  data: require('./data'),
  meta: require('./meta'),
  methods: require('./methods'),
  routes: require('./routes'),

  compile: require('./compile'),
  components: require('./components/components-map')
};
