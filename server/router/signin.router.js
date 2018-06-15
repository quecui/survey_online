const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')
  .post(function(req, res, next) {
    User.findOne({username: req.body.username}, (err, user)=>{
      if (err || !user){
        return res.status('404').json({ message: "Username is not exit"});
      } else{
        if (user.password != req.body.password){
          return res.status('404').json({ message: "Password is wrong"});
        }
        req.session.token = user._id
        //todo: Update late
        //User.update({username: req.body.username}, {$set: {token: req.session.token}})
        return res.status('200').json({ message: 'ok', dataReq: {token: req.session.token, username: req.body.username} });
      }
    })
  })

router.route('/token')
  .post(function (req, res) {
    User.findOne({_id: req.body.token}, (err, user) => {
      if (err || !user) {
        return res.status('404').json({message: 'Session Timeout. Please Login'})
      }
      req.session.token = req.body.token

      return res.status('200').json({message: 'ok', dataReq: {username: user.username}})
    })
  })

module.exports = router
