#!/usr/bin/env node
var express = require('express')
var app = express()

app.use(express.static('app'))
app.listen(9000)

module.exports = app
