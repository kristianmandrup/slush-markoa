App Components
--------------

The App Components folder should be used to define components (tags) that are local to your app only.

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

### Convert to a global component

You will find that some components that initially start out as being local to your app will find global use, or can be re-purposed as a more generic base component which you can then specialize (extend) for each individual app. Simply copy the component to the `_global/components` folder and make sure it is imported in the taglib there (via `marko-taglib.json`). Then make sure the components still works in your app and refactor as needed, perhaps by creating a new app specific variant which extends your new generic component, f.ex using data specific to your app.
