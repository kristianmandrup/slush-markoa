Slush Markoa [![Build Status](https://secure.travis-ci.org/kristianmandrup/slush-markoa.png?branch=master)](https://travis-ci.org/kristianmandrup/slush-markoa) [![NPM version](https://badge-me.herokuapp.com/api/npm/slush-markoa.png)](http://badges.enytc.com/for/npm/slush-markoa)
=======================================================================================================================================================================================================================================================================================

> Markoa app generator

Generators included
-------------------

-	`slush markoa` (basic project with markoa apps)
-	`slush markoa:app` (add app to apps)
-	`slush markoa:data` (add app to apps)
-	`slush markoa:layout` (Stylus and Jade->Marko configuration)
-	`slush markoa:roots` (roots.cx configuration)
-	`slush markoa:tag` (add one marko tag)
-	`slush markoa:taglibs` (add one or more marko taglibs)
-	`slush markoa:tags` (add multiple marko tags)
-	`slush markoa:widget` (add one or more marko widgets)

TODO: Improve `widget` generator similar to make more similar to `tag` generator ;)

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

### Layout and Styling

We recommend running the *layout* generator included to get a nice project setup for using Stylus with various cool plugins to make layout and styling of your app a much more fun experience!!!

Note: Be sure to read the `Layout.md` file generated for tips, info etc. ;)

App container generated
-----------------------

### App file structure

```sh
/apps
  /_global
    /components
    /data
      index.js
    /layouts
      web-layout.jade
  /index
    /components
      /project-feed
        template.marko
    /layouts
      mobile-layout.jade
    /page
      layout.jade
      index.jade
      index.marko
      index.browser.json
    /data
      index.js
    marko-taglib.json
  /repositories
  /teams
  ...
  marko-taglib.json  

  // Gulp build tasks
  /build
    /tasks
      jade.js
      stylus.js
      watch.js
    paths.js
    ...
```

### Development

Watching files:

`gulp watch` - watches `.jade` files in `/apps` and `.styl` files in `/styles`

The Markoa server is by default configured to watch .marko files in the /apps folders registered and will reload in order to recompile to `.js` template files.

You can enable [browser refresh](https://github.com/patrick-steele-idem/browser-refresh)

```sh
npm install browser-refresh --global
browser-refresh server.js
```

Which should auto reload the browser whenever a `.marko` page is changes, for instant feedback!

There is also a `browser-refresh.json` file for configuring this in more details, including for SSL support.

### Distribution

Static assets are compiled to `/dist` and can be referenced from marko directly.

So this is valid:

```html
<link rel="stylesheet" type="text/css" href="app.css">
<link rel="stylesheet" type="text/css" href="semantic.min.css">
<script src="semantic.min.js"></script>
```

Or the same in a `.jade` file

```jade
link(rel="stylesheet" type="text/css" href="app.css")
link(rel="stylesheet" type="text/css" href="semantic.min.css")
script(src="semantic.min.js")
```

### Layout

First run `slush markoa:layout` to generate setup for Jade, Stylus and Semantic UI - to power the layout of your app.

Install Semantic UI as instructed: `npm install semantic-ui --save`

### Generating apps

`slush markoa:app`

This geneator will create an app under apps/[app-name] similar to the default `index` app generated by the default marko generator. Use this generator each time you want to add an app!

```
/[app]
  /components
    /project-feed
      template.marko
  /layouts
    _page.jade
  /data
    index.js
  /page
    index.jade
    index.marko
    index.browser.json
  marko-taglib.json
```

### Generating tags

`slush markoa:tag`

Use this generator each time you want to add a tag! If no app name is given, the tag becomes global:

`apps/_global/components`

```sh
/apps
  /_global
    /components
      /[tag]
        marko-tag.json
        renderer.js
        template.marko
        template.jade

  marko-taglib.json
```

If an app name is given: `apps/[app-name]/components`

```sh
/apps
  /[app]
    /components
      /[tag]
        marko-tag.json
        renderer.js
        template.marko
        template.jade
```

#### Tags and Taglibs

As you get more fine grained tags, it starts to make sense to group them into categories such as:

-	button Tags
-	list tags
-	list item tags
-	...

In order to support this, you can use a special namespace feature `xxx:aaa` or `xxx:aaa-bb`

This will create a subfolder `xxx` for the tag. F.ex for the tag `menu:top`

```sh
/apps
  /_global
    /components
      /menu
        /menu-top
          marko-tag.json
          renderer.js
          template.marko
          template.jade

  marko-taglib.json
```

The new folder `menu` is a new sub-tag lib. For this new `menu` taglib to be reachable, it must be imported in a parent taglib (see section below on *Taglibs*).

#### Single tag example

-	What is the name of your tag or tags (, separated) ? `top-menu`
-	For which app (empty: global) ?

Creates the global tag `top-menu` under `apps/_global`

```sh
- template.jade
- template.marko
- renderer.js
- marko-tag.json
```

Example `ui-tabs`

Example: `ui-tabs/marko-tag.json`

```json
{
    "@orientation": "string",
    "@tabs <tab>[]": {
        "@title": "string"
    }
}
```

`renderer.js` references `template.marko` (see below)

```js
var template = require('./template.marko');
exports.renderer = function(input, out) {
  template.render(input, out);
};
```

`ui-tabs/template.marko`

```html
<div class="tabs">
    <ul class="nav nav-tabs">
        <li class="tab" for="tab in data.tabs">
            <a href="#">
                ...
            </a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane" for="tab in data.tabs">
            <invoke function="tab.renderBody(out)"/>
        </div>
    </div>
</div>
```

### Marko taglibs

Each app has its own taglib file. This file can reference multiple folders if needed.

`marko-taglib.json` example:

```json
{
    "tags-dir": ["./components", "./modules"]
}
```

You can also import other taglibs into a taglib. This feature is used to include the `/menu` taglib for the global taglib:

```json
{
    "tags-dir": "./_global/components",
    "taglib-imports": [
      "./_global/components/menu/marko-taglib.json"
    ]
}
```

#### Multiple tags

-	What is the name of your tag or tags (, separated) ? `top-menu, side-bar, session-bar`
-	For which app (empty: global) ? `index`

Creates the tags: `top-menu`, `side-bar` and `session-bar` for the app `apps/index`

### Marko Widgets

[Marko Widgets](https://github.com/marko-js/marko-widgets) are special kinds of tags that support dynamic rendering and data binding etc. much like Reactive widgets/components from other frameworks such as React components. However Marko Widgets support both client and server side rendering amongst many other benefits, such as much lower footprint (kb) and higher server rendering performance (x10) than typical React components.

To create one or more widgets:

`slush markoa:widget`

Name the widget or list widgets to be created, just like for a tag. The simplest Widget template looks something like this:

```html
<div w-bind>
    Hello $data.name
</div>
```

With a corresponding "ViewModel" or Widget controller:

```js
// widget.js
module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    getTemplateData: function(state, input) {
        return {
            name: input.name || 'unknown name'
        };
    },

    init: function() {
        var el = this.el; // The root DOM element that the widget is bound to
        console.log('Initializing widget: ' + el.id);
    }
});
```

Read more about how to get the full benefits of reactive Widgets for client and server on the [Marko Widgets page](https://github.com/marko-js/marko-widgets). Enjoy :)

### Full page setup

```html
<lasso-page name="index" package-path="./browser.json" />

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Marko Widgets: Bind</title>
    <lasso-head/>
</head>
<body>
    <h1>Marko Widgets: Bind</h1>

    <div class="my-component" w-bind="./widget">
        <h2>Click Me</h2>
    </div>

    <lasso-body/>
    <init-widgets/>
</body>
</html>
```

The `browser.json` that includes the required client-side code is shown below:

`src/pages/index/browser.json`

```json
{
    "dependencies": [
        "require: marko-widgets",
        "require: ./widget"
    ]
}
```

### Browser Widget dependencies

This `browser.json` setup for client side widget dependencies doesn't work as is. Our setup is more advanced. We need the `/widget` folder to expose methods to give us all global widgets and all widgets for each app. Then determine or find the widgets being used on the page, by either: - use a list such as `widgets.json` in the `/page folder` - if no `widgets.json`, parse through the `marko.html` for non-html tags

look up widgets in widget registry as part of yet another compile phase (on `gulp watch`) and dynamically generate the browser.json file (perhaps by having a `browser.json` (no marko widgets) and an `index.browser.json` generated and referenced).

### Registering the apps

Follow a recipe like the following...

```js
let markoa = require('markoa');
// see markoa docs for how to create appContainer
let myAppContainer = ...;

let myApp = require('./my-app');
let apps = ['index', 'projects'];

// mount apps on your appContainer using conventions!
myApp.mountIn(myAppContainer, apps);
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
