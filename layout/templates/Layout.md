Layout
======

### Jade layout files

Read [Jade docs](http://jade-lang.com/api/)

By convention, layout files are post fixed with `-layout`. The default layout for any app should be in the `/page` folder and simply be called `layout.jade`.

### Styling

Run `gulp watch` to watch `styl` and `jade` files for changes and auto-compile on save.

Read [Stylus docs](https://learnboost.github.io/stylus/)

-	[Nib](https://github.com/tj/nib)
-	[Axis](http://axis.netlify.com/)
-	[Rupture](http://jenius.github.io/rupture/)
-	[Fluidity](www.fluiditycss.com)
-	[Typographic](https://github.com/corysimmons/typographic)
-	[Jeet](http://jeet.gs/)

### Video tutorials

We highly recommend watching these [Stylus tutorial videos](https://www.youtube.com/playlist?list=PLLnpHn493BHFWQGA1PcyQZWAfR96a4CkH) to get a feel and understanding of the power of using Stylus with plugins.

Get over the temptation to use Bootstrap or kin for all your styling needs. Break your bad habits ;)

### Axis

By default, axis will *auto-import itself into all your stylesheets*. This is purely for convenience -- axis only defines mixins, so it's invisible if you don't use any of it's mixins anyway. However, if you'd rather not have it do this, you can initialize axis with `{ implicit: false }`, then you'll need to manually `@import` it in your stylus in order to use it

### Marko

Read [Marko Custom tags](https://github.com/marko-js/marko#custom-taglibs)

### Porting existing HTML to tags/templates

Use [Html2Jade](http://html2jade.aaron-powell.com/) to convert existing HTML to Jade templates.

CLI: [html2jade](https://github.com/donpark/html2jade)

Gulp: [gulp-html2jade](https://www.npmjs.com/package/gulp-html2jade)

### Semantic UI

Build semantic distribution as explained in [Semantic UI - Getting Started](http://semantic-ui.com/introduction/getting-started.html)

`cd semantic && gulp build`

In `layout.jade`

```jade
link(rel="stylesheet" type="text/css" href="semantic.min.css")
script(src="semantic/dist/semantic.min.js")
```

### Add your own styling to Marko

Run `gulp css` to concatenate your css files into one file and minify it.

In your `layout.jade` add

```jade
link(rel="stylesheet" type="text/css" href="app.min.css")
```

Alternatively have your application `layout.jade` files extend a global `app-layout.jade` template which includes the semantic ui and your main application css.

Use [Lasso.js](https://github.com/lasso-js/lasso) when you go beyond simple experimentation!!

For Lasso.js details/overview, talk with [Javier](javier.cabrera@gmail.com)
