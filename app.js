#!/usr/bin/env node
var express = require('express')
var app = express()

app.use(express.static(__dirname + '/app'))

app.get('*', function(req, res) {
  res.sendFile('index.html')
})

app.listen(9000, function() {
  console.log('app listening on port 9000')
})

module.exports = app
