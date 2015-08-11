'use strict';
let marooka = require('marooka');
let path = require('path');
let rootPath = path.resolve(path.join(__dirname, '../'));
// mounting multiple apps on appContainer instance
module.exports = new marooka.AppMounter(rootPath).mountApps(['index']).start();
