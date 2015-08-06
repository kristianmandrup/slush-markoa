// TODO: improve!
let markoa = require('./markoa');
let appConfigurator = new markoa.appContainer.configurator(__dirname);
let mounter = require('./mounter')(appConfigurator);
// let apps = ['index'];
// mounter.mount(apps);
