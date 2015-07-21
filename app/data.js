
var cssnext = require('cssnext');

var fs = require('fs');

var postDir = __dirname + '/posts/';
var posts = fs.readdirSync(postDir);

var generateRoutes = require('./generateRoutes.js');

console.log(generateRoutes);

module.exports = {
  title: 'My Static Site',
  routes: [
    '/',
    '/about'
  ]
}

