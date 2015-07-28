var fs = require('fs');
var _ = require('lodash');

var POST_RELATIVE_DIR = '/posts/';
var OUTPUT_NAME = __dirname + '/generatedRoutes/_routes';
var postDir = __dirname + POST_RELATIVE_DIR;

var postFiles = fs.readdirSync(postDir);

var posts = _.compact(
  _.map(postFiles, function(postFilename, postIndex) {
    if(postFilename[0] === '.') {
      return;
    }
    var componentFilename = postDir + postFilename + '/component.js';
    var postContents = fs.readFileSync(componentFilename).toString();

    var key = postFilename.replace(/[^a-zA-Z0-9]/g, '');

    var route = {
      path: '/' + key + '/',
      componentPath: '..' + POST_RELATIVE_DIR + postFilename + '/component.js',
      key: key,
    }

    return route;
  })
);

// provides a map of <Route>s and import statements
function generateRoutesJSX() {
  var routes = _.reduce(
    _.map(posts, function(post) {
      return {
        route: "<Route path='" + post.path + "' handler={" + post.key + "} />",
        import: "import " + post.key + " from '" + post.componentPath + "';",
      }
    }),
    function(result, value, key) {
      result.route += value.route + "\n";
      result.import += value.import + "\n";
      return result;
    },
    {
      route: '',
      import: ''
    }
  );

  var file = 'var React = require("react");\n' +
    'var Route = require("react-router").Route;\n' +
    routes.import +
    'module.exports = (<Route>' + routes.route + '</Route>);';

  fs.writeFileSync(OUTPUT_NAME + '.jsx', file, 'utf-8');
}

function generateJSON() {
  var output = {
    'posts': posts
  }
  var file = 'module.exports = ' + JSON.stringify(output, null, '\t');
  fs.writeFileSync(OUTPUT_NAME + '.json', file, 'utf-8');

}

generateRoutesJSX()
generateJSON()
module.exports = posts;


