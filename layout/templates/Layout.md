Layout
======

### Jade layout files

By convention, layout files are post fixed with `-layout`. The default layout for any app should be in the `/page` folder and simply be called `layout.jade`.

The Jade page template will have to be re-compiled in order to pick up the layout change. Simply run `gulp jade:marko` to achieve this!

### Styling

Run `gulp watch` to watch `styl` and `jade` files for changes and auto-compile on save.

### Porting existing HTML to tags/templates

Use [Html2Jade](http://html2jade.aaron-powell.com/) to convert existing HTML to Jade templates.

Or via CLI: [html2jade](https://github.com/donpark/html2jade)

TODO: Convert to Gulp transform (plugin)
