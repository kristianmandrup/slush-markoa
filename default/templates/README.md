<%= appName %> [![Build Status](https://secure.travis-ci.org/<%= authorName %>/<%= appNameSlug %>.png?branch=master)](https://travis-ci.org/<%= authorName %>/<%= appNameSlug %) [![NPM version](https://badge-me.herokuapp.com/api/npm/<%= appNameSlug %>.png)](http://badges.enytc.com/for/npm/<%= appNameSlug %)
===================================================================================================================================================================================================================================================================================================================

> Markoa app generator

Getting Started
---------------

Install `<%= appNameSlug %>` in a project where you want to mount the app:

```bash
$ npm install <%= appNameSlug %> --save
```

### Usage

### App file structure

```sh
/apps
  /_global
    /components
    /state
      index.js
    /layouts
      _default_page.jade
  /index
    /components
      /project-feed
        template.marko
    /layouts
      _page.jade
    /state
      index.js
    /page
      index.jade
      index.marko
      index.browser.json
    marko-taglib.json
  /repositories
  /teams
  ...
  marko-taglib.json  
```

### Registering the apps

```js
let markoa = ('markoa');
let appConfigurator = new markoa.appContainer.configurator(__dirname);
appConfigurator.mountApps('projects', 'teams']);
```

Contributing
------------

See the [CONTRIBUTING Guidelines](https://github.com/<%= authorName %>/<%= appNameSlug %>/blob/master/CONTRIBUTING.md)

Support
-------

If you have any problem or suggestion please open an issue [here](https://github.com/<%= authorName %>/<%= appNameSlug %>/issues).

License
-------

Copyright (c) 2015, <%= authorName %>
