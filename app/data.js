
var cssnext = require('cssnext');

var fs = require('fs');

var postDir = __dirname + '/posts/';
var posts = fs.readdirSync(postDir);

var generateRoutes = require('./generateRoutes.js');

var defaultRoutes = [
  '/',
  '/about',
];

var routes = defaultRoutes.concat(generateRoutes);
console.log(routes);
module.exports = {
  title: 'My Static Site',
  routes: routes
}

