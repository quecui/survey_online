const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const accountRouter = require('./router/account')
const surveyRouter = require('./router/survey')
const answerRouter = require('./router/answer')

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/account', accountRouter);
app.use('/survey', surveyRouter);
app.use('/answer', answerRouter);

module.exports = app;
