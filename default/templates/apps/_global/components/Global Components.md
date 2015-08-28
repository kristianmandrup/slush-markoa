Global Components
-----------------

The Global Components folder should be used to define components (tags) that are global to your app and shared/reused across multiple apps.

A component can be either a custom:

-	Tag
-	Widget

Use the [slush-markoa](https://github.com/kristianmandrup/slush-markoa) generator to generate tags and widgets!

### Tag

A *Tag* is a piece of rendering logic or template to generate HTML via string concatenation.

### Widget

A *Widget* is a more complex piece, which can render as a Tag on the server but be used like a Reactive, dynamic, interactive component on the Client (in the browser).

### Tag libraries

As your library gets larger, you are well advised to group components into so called "tag libraries" using sub-folders. This is most easily achieved via the [slush-markoa](https://github.com/kristianmandrup/slush-markoa) generator.

### Utility libraries

You can also create independent modules for utility libraries which can be imported into any other module using normal `npm install`. Have your libraries import external tag libs by referencing your `package.json`. The taglib finder will then go through all your package dependencies, look into `node_modules` and find any with a `marko-taglib.json` in its root and import it!
