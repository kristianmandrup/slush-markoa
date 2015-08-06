Slush Markoa [![Build Status](https://secure.travis-ci.org/kristianmandrup/slush-markoa.png?branch=master)](https://travis-ci.org/kristianmandrup/slush-markoa) [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-markoa.png)](http://badges.enytc.com/for/npm/slush-markoa)
=======================================================================================================================================================================================================================================================================================

> Markoa app generator

Getting Started
---------------

Install `slush-markoa` globally:

```bash
$ npm install -g slush-markoa
```

### Usage

Create a new folder for your project:

```bash
$ mkdir my-slush-markoa
```

Run the generator from within the new folder:

```bash
$ cd my-slush-markoa && slush markoa
```

App generated
-------------

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

### Generating more apps

`slush markoa-app name`

### Registering the apps

In your `mount.js` file in the project root folder.

```js
let markoa = ('markoa');
let appConfigurator = new markoa.appContainer.configurator(__dirname);
// list of apps in /apps folder you wish to mount
let apps = ['projects', 'teams'];
appConfigurator.mountApps(apps);
```

Getting To Know Slush
---------------------

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

Contributing
------------

See the [CONTRIBUTING Guidelines](https://github.com/kristianmandrup/slush-markoa/blob/master/CONTRIBUTING.md)

Support
-------

If you have any problem or suggestion please open an issue [here](https://github.com/kristianmandrup/slush-markoa/issues).

License
-------

The MIT License

Copyright (c) 2015, Kristian Mandrup

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
