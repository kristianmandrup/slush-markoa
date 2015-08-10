axis          = require 'axis'
rupture       = require 'rupture'
autoprefixer  = require 'autoprefixer-stylus'
jeet          = require 'jeet'
js_pipeline   = require 'js-pipeline'
css_pipeline  = require 'css-pipeline'
paths         = require './build/paths.js'

client_templates = require('client-templates')

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    js_pipeline(files: paths.source),
    css_pipeline(files: paths.styles)

    # all jade templates placed in this folder will be precompiled into public/js/templates.js
    # and can be used from inside the client browser via template[filename]
    # https://github.com/carrot/roots-client-templates
    # https://www.youtube.com/watch?v=_lPLVd0UsdI
    client_templates(
      base: "templates/", # required
      pattern: "*.jade", # defaults to **
      out: "public/js/templates.js" # defaults to js/templates.js
    )
  ]

  output: paths.output
  server: 'app_server.js'

  stylus:
    use: [axis(), rupture(), autoprefixer(), jeet()]
    sourcemap: true

  'coffee-script':
    sourcemap: true

  # do we even need this!?
  jade:
    pretty: true
