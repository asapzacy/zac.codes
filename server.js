#!/usr/bin/env node
const express = require('express')
const path = require('path')
const compression = require('compression')
const port = process.env.PORT || 8080
const app = express()

app.use(compression())
app.use(express.static('app'))
// app.get('*', function(req, res) {
//   res.sendFile(path.resolve('app/404/index.html'))
// })
app.listen(port, function() {
  console.log(`server listening on port ${port}`)
})

module.exports = app
