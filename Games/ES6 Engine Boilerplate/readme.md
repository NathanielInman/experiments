# ES6 Engine Boilerplate #
Creating an engine for a javascript game can be pretty complicated. This project is an ES6 module version using the newest syntax in an effort to make a more streamlined and future-proof approach. Babel converts the modules into AMD modules.

## Structure ##
```
project
├─dist
│ ├─scripts
│ │ ├─common
│ │ │ ├─r1
│ │ │ │ ├─a.js
│ │ │ │ └─b.js
│ │ │ └─r2
│ │ │   ├─c.js
│ │ │   ├─r2c
│ │ │   │ ├─f.js
│ │ │   │ └─e.js
│ │ │   └─d.js
│ │ └─engine.js
│ ├─app.js
│ ├─styles
│ │ └─app.min.css
│ └─ index.html
├─ src
│ ├─scripts
│ │ ├─common
│ │ │ ├─r1
│ │ │ │ ├─a.js
│ │ │ │ └─b.js
│ │ │ └─r2
│ │ │   ├─c.js
│ │ │   ├─r2c
│ │ │   │ ├─f.js
│ │ │   │ └─e.js
│ │ │   └─d.js
│ │ └─engine.js
│ ├─app.js
│ ├─styles
│ │ ├─boilerplate.styl
│ │ └─main.styl
│ └─views
│   ├─partials
│   │ ├─footer.jade
│   │ ├─head.jade
│   │ └─scripts.jade
│   └─ index.jade
├─ gulpfile.js
├─ package.json
└─ readme.md
```
