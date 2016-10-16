var express = require('express')
var stylus = require('stylus')
var app = express()

app.use(express.static('build'))
app.get('/', (req, res) => res.send('ayyy homie . . .'))

app.listen(9000)
module.exports = app

// app.use(stylus.middleware({
//   src: __dirname + '/app/css',
//   dest: __dirname + '/build/css',
//   compile: function compile(str, path){
//      return stylus(str).set('filename', path).set('compress', true);
//   }
// }))
