// server/app.js
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const passport = require('passport')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))

const signinRouter = require('./router/signin.router.js')
const registerRouter = require('./router/register.router.js')
const surveyRouter = require('./router/survey.router.js')

app.use(passport.initialize())
app.use(passport.session())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/signin', signinRouter);
app.use('/register', registerRouter);
app.use('/survey', surveyRouter);

module.exports = app
