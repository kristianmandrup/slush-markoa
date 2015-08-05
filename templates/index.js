let markoa = require('./markoa');
let appContainer = markoa.appContainer;

let myAppConfigurator = new appContainer.configurator(__dirname);
// myAppConfigurator.pageData = myPageDataFn;
let myApps = ['index'];
myAppConfigurator.mountApps(myApps);
