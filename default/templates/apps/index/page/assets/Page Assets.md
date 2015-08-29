### Asset dependencies

Each page has an `/assets` folder where the asset dependencies for the page are configured via `.json` files.

Each page has a `browser.json` file used by [lasso](https://github.com/lasso-js/lasso). In this file you define your style (css) and script (js) dependencies. Lasso can understand most formats!

When the app is compiled, it uses `browser.json` as the base and generates an `[app name].browser.json` file, such as `index.browser.json` which is used by the page rendering engine.

`index.browser.json` includes widgets needed by the page, which are determined dynamically from parsing the page for tags and determining which tags are widgets. This is not perfect, so you are advised to adjust `widgets.json` to your needs.

### Page styling

Add your style dependencies to `browser.json`, like this:

```json
{
    "dependencies": [
        "./style.less",
        "css/app.css",
        "stylus/app.styl",
        ...
    ]
}
```

Ideally you should only reference [external-dependencies](https://github.com/lasso-js/lasso#external-dependencies)

### Including Semantic UI

Use the `browser.json` file to tell Lasso to include these assets on the page:

```json
{
    "dependencies": [
        "./semantic.min.css",
        "./semantic.min.js",
        "require: marko-widgets"
    ]
}
```
