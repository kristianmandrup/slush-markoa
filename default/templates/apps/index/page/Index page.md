Index page app
--------------

Each page in your application has one main template called `[app name]`, such as `index.jade` for the Index application. The `index.jade` template is compiled to a `index.marko` template and a `index.marko.js` file.

It is the `.js` file which renders the HTML on the server and sends the stream of HTML the client browser.

### Lasso dependencies

Each page has a `browser.json` file used by [lasso](https://github.com/lasso-js/lasso) In this file you define your style and script dependencies. It can understand many formats!

When the app is compiled, it uses `browser.json` as the base and generates an `[app name].browser.json` file, such as `index.browser.json` which is used by the page rendering engine.

`index.browser.json` includes widgets needed by the page, which are determined dynamically from parsing the page for tags and determining which tags are widgets. This is not perfect, so you are advised to adjust `widgets.json` to your needs.

### Page styling

In `browser.json`

```json
{
    "dependencies": [
        "./style.less",
        ...
    ]
}
```

Ideally you should only reference [external-dependencies](https://github.com/lasso-js/lasso#external-dependencies)
