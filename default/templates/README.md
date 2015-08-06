<%= appName %>
==============

<%= appDescription %>

Install
-------

Install `<%= appNameSlug %>` in a project where you want to mount the app:

```bash
$ npm install <%= appNameSlug %> --save
```

### Usage

Ideally you should be able to mount the app like this:

```js
let myApp = require('<%= appNameSlug %>');
let apps = ['index'];
myApp.mountIn(myAppContainer, apps);
```

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

Contributing
------------

See the [CONTRIBUTING Guidelines](https://github.com/<%= userName %>/<%= appNameSlug %>/blob/master/CONTRIBUTING.md)

Support
-------

If you have any problem or suggestion please open an issue [here](https://github.com/<%= userName %>/<%= appNameSlug %>/issues).

License
-------

Copyright (c) 2015, <%= authorName %>
