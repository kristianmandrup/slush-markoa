Index
-----

Each page in your application has one main template called `[app name]`, such as `index.jade` for the Index application. The `index.jade` template is compiled to a `index.marko` template and a `index.marko.js` file.

It is the `.js` file which renders the HTML on the server and sends the stream of HTML the client browser.

### Page asset dependencies

Page asset dependencies can be managed by [Lasso](https://github.com/lasso-js/lasso) via the JSON config files in `page/dependencies`.

### Template Inheritance

If you have a `meta.js` file in the root of your app `index/meta.js` it can be configured to use the template from another app. This is known as "template inheritance".
