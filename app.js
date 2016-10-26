#!/usr/bin/env node
const express = require('express')
const compression = require('compression')
const app = express()
const port = process.env.PORT || 8080

const env = app.get('env')
console.log(env)

app.use(compression())
app.use(express.static('app'))
app.listen(port, () => console.log(`server listening on port ${port}`))

module.exports = app
