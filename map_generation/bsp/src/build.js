"format register";
System.register("npm:core-js@0.9.13/library/modules/$.fw", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function($) {
    $.FW = false;
    $.path = $.core;
    return $;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.4.7/helpers/class-call-check", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.13/library/modules/$", ["npm:core-js@0.9.13/library/modules/$.fw"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min;
  var DESC = !!function() {
    try {
      return defineProperty({}, 'a', {get: function() {
          return 2;
        }}).a == 2;
    } catch (e) {}
  }();
  var hide = createDefiner(1);
  function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  }
  function simpleSet(object, key, value) {
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap) {
    return DESC ? function(object, key, value) {
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  function isObject(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it) {
    return typeof it == 'function';
  }
  function assertDefined(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  }
  var $ = module.exports = require("npm:core-js@0.9.13/library/modules/$.fw")({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    isObject: isObject,
    isFunction: isFunction,
    that: function() {
      return this;
    },
    toInteger: toInteger,
    toLength: function(it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    },
    toIndex: function(index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key) {
      return hasOwnProperty.call(it, key);
    },
    create: Object.create,
    getProto: Object.getPrototypeOf,
    DESC: DESC,
    desc: desc,
    getDesc: Object.getOwnPropertyDescriptor,
    setDesc: defineProperty,
    setDescs: Object.defineProperties,
    getKeys: Object.keys,
    getNames: Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    ES5Object: Object,
    toObject: function(it) {
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    each: [].forEach
  });
  if (typeof __e != 'undefined')
    __e = core;
  if (typeof __g != 'undefined')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.13/library/fn/object/define-property", ["npm:core-js@0.9.13/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.13/library/modules/$");
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.4.7/core-js/object/define-property", ["npm:core-js@0.9.13/library/fn/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.13/library/fn/object/define-property"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.4.7/helpers/create-class", ["npm:babel-runtime@5.4.7/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.4.7/core-js/object/define-property")["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register('lib/easel', ['npm:babel-runtime@5.4.7/helpers/create-class', 'npm:babel-runtime@5.4.7/helpers/class-call-check'], function (_export) {
  var _createClass, _classCallCheck, Easel;

  return {
    setters: [function (_npmBabelRuntime547HelpersCreateClass) {
      _createClass = _npmBabelRuntime547HelpersCreateClass['default'];
    }, function (_npmBabelRuntime547HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime547HelpersClassCallCheck['default'];
    }],
    execute: function () {
      'use strict';

      Easel = (function () {
        function Easel() {
          var _this = this;

          _classCallCheck(this, Easel);

          // Easel public variables
          this.background = '#000';
          this.started = false;

          // Make sure the canvas exists before doing anything
          if (!!window.CanvasRenderingContext2D) {
            this.activated = true;
          } else {
            this.activated = false;
            return false;
          } //end if

          // Helpful global hoisting
          window.W = window;
          window.D = document;
          window.M = Math;
          window.C = D.createElement('canvas');
          window.ctx = C.getContext('2d');
          window.v = this.acquireViewport();
          window.r = function (f, g, e) {
            f = !g ? 0 * (g = f) : f > g ? g + (d = f) - g : f;
            e = e || 0;
            g = M.random() * (g - f) + f;
            return e ? g | 0 : g;
          };
          window.onresize = function () {
            W.v = _this.acquireViewport();
            _this.resizeCanvas();
            _this.config();
            _this.redraw();
          };

          // Create the actual canvas object and styling
          document.body.appendChild(C);
          var d = document.createElement('style');
          d.type = 'text/css';
          d.rel = 'stylesheet';
          d.innerHTML = 'body{background-color:' + this.background + ';margin:0;}\n                   canvas{position:fixed;left:0;top:0;right:0;bottom:0;}';
          document.getElementsByTagName('head')[0].appendChild(d);

          // Initiate the instance and size
          this.resizeCanvas();
        }

        _createClass(Easel, [{
          key: 'resizeCanvas',
          value: function resizeCanvas() {
            C.width = v.w;
            C.height = v.h;
          }
        }, {
          key: 'acquireContext',
          value: function acquireContext() {
            ctx = window.C.getContext('2d');
          }
        }, {
          key: 'acquireViewport',
          value: function acquireViewport() {
            var d = W,
                b = 'inner';
            if (!d.innerWidth) {
              b = 'client';
              d = D.documentElement || D.body;
            } //end if
            return {
              w: d[b + 'Width'],
              h: d[b + 'Height']
            };
          }
        }, {
          key: 'redraw',
          value: function redraw() {
            if (!this.started) {
              this.config();
              this.started = true;
            } //end if
            this.onDraw();
          }
        }, {
          key: 'config',
          value: function config() {}
        }, {
          key: 'onDraw',
          value: function onDraw() {
            ctx.fillStyle = this.background;
            ctx.fillRect(0, 0, v.w, v.h);
          }
        }]);

        return Easel;
      })();

      _export('default', new Easel());
    }
  };
});
System.register("app", ["lib/easel"], function (_export) {
  "use strict";

  var easel;
  return {
    setters: [function (_libEasel) {
      easel = _libEasel.easel;
    }],
    execute: function () {

      console.log("Application started");
    }
  };
});
//# sourceMappingURL=build.js.map