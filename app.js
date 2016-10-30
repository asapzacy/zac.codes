#!/usr/bin/env node
const express = require('express')
const compression = require('compression')
const port = process.env.PORT || 8080
const app = express()

app.use(compression())
app.use(express.static('app'))
app.listen(port, console.log(`server listening on port ${port}`))

module.exports = app
