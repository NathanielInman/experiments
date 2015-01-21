/* jshint ignore:start */
var
  fs = require('fs'),
  express = require('express'),
  consolidate = require('consolidate'),
  app = express(),
  
  handler, tpl, fetchJson;

module.exports = app;

// serve static files
app.use(express.static('dist/'));

app.set('view engine', 'jade');

// set templates location
app.set('views', __dirname + '/views/');


fetchJson = function(id) {
  var json;
  try {
    json = JSON.parse(fs.readFileSync(
      app.get('views') + id + '.json',
      'utf-8'
    ));
  } catch (e) {
    json = {};
  } finally {
    return json;
  }
};

// all requests handler
handler = function(req, res, next, extra) {
  var json = fetchJson(req.params.template);
  json.__dev__ = process.env.NODE_ENV === 'production' ? false : true;
  Object.keys(extra || {}).forEach(function(k) {
    json[k] = extra[k];
  });
  res.render(req.params.template, json);
};


app.param(function(name, fn) {
  if (fn instanceof RegExp) {
    return function(req, res, next, val) {
      var captures;
      if ((captures = fn.exec(String(val)))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    };
  }
});
// Needed to suppress .ico and other files with extension failure messages.
app.param('template', /^\w+$/);
app.get('/:template', handler);

// default index handler
app.get('/', function(req) {
  req.params.template = 'index';
  [].push.call(arguments, fetchJson('scripts'))
  handler.apply(null, arguments);
});
