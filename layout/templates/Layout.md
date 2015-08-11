Layout
======

### Jade layout files

Read [Jade docs](http://jade-lang.com/api/)

By convention, layout files are post fixed with `-layout`. The default layout for any app should be in the `/page` folder and simply be called `layout.jade`.

The Jade page template will have to be re-compiled in order to pick up the layout change. Simply run `gulp jade:marko` to achieve this!

### Styling

Run `gulp watch` to watch `styl` and `jade` files for changes and auto-compile on save.

Read [Stylus docs](https://learnboost.github.io/stylus/)

-	[Axis](http://axis.netlify.com/)
-	[Jeet](jeet.gs)
-	[Rupture](https://github.com/jenius/rupture)
-	[Nib](http://nibstyl.us/)
-	[Fluidity](http://www.fluiditycss.com/)

### Video tutorials

-	[Rupture tutorial](https://www.youtube.com/watch?v=fRVRtO95VhU)
-	... just google ;)

### Axis

By default, axis will *auto-import itself into all your stylesheets*. This is purely for convenience -- axis only defines mixins, so it's invisible if you don't use any of it's mixins anyway. However, if you'd rather not have it do this, you can initialize axis with `{ implicit: false }`, then you'll need to manually `@import` it in your stylus in order to use it

### Marko

Read [Marko Custom tags](https://github.com/marko-js/marko#custom-taglibs)

### Porting existing HTML to tags/templates

Use [Html2Jade](http://html2jade.aaron-powell.com/) to convert existing HTML to Jade templates.

CLI: [html2jade](https://github.com/donpark/html2jade)

Gulp: [gulp-html2jade](https://www.npmjs.com/package/gulp-html2jade)
