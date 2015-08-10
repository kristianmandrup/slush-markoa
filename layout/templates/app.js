'use strict';
let markoa = require('markoa');
let path = require('path');

let lassoFile = path.join(__dirname, './lasso-config.json');

let staticDirs = []
for (let dir of ['dist'])
  staticDirs.push(path.join(__dirname, dir));

let staticConf = {dirs: staticDirs};

// configure explicitly to use /dist static asset folder
let serverOpts = {port: 4005, lassoFile: lassoFile, static: staticConf };
let Server = markoa.Server;

let koaApp = new Server(serverOpts).init(function(mws) {
  mws.minimal();
});

let AppContainer = markoa.AppContainer;
let myAppContainer = new AppContainer(); //.start();

let mounter = new markoa.AppMounter(__dirname);

let apps = ['project', 'repository'];
// mounting multiple apps on appContainer instance
mounter.mountApps(apps);
mounter.appContainer.createRoutes(koaApp).start();
