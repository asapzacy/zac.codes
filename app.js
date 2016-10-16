#!/usr/bin/env node
var express = require('express')
var app = express()

app.use(express.static('build'))
app.listen(8080)

module.exports = app
