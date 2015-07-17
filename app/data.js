
var cssnext = require('cssnext');

var fs = require('fs');

var postDir = __dirname + '/posts/';
var posts = fs.readdirSync(postDir);

console.log(posts)

module.exports = {
  title: 'My Static Site',
  routes: [
    '/',
    '/about'
  ]
}

