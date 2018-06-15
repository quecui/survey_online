const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')
  .post(function(req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    })
    user.save(function(err) {
      if (err) return res.status('505').json({ message: "Don't create with this username"});
      return res.status('200').json({ message: 'Register successfully'});
    })
  })

module.exports = router
