const express = require('express');
const router = express.Router();
const Component = require('../models/component');
const Page = require('../models/page');
const Result = require('../models/result');
const Survey = require('../models/survey');
const User = require('../models/user');

router.route('/')
  .get(function(req, res) {
    User.find({_id: req.body.user_id})
      .populate('survey_ids')
      .exec((err, result)=>{
        if (err){
          return res.status(500).json({
            message: 'Server error'
          })
        } else if (!result){
          return res.status(404).json({
            message: 'Not found suitable data'
          })
        } else if (result){
          return res.status(200).json({
            message: 'Success',
            data: result
          })
        }
      })
  })
  .delete(function(req, res) {
    Survey.findOne({_id: req.body.survey_id})
      .select({'_id': true, 'page': true})
      .populate({
        path: 'pages',
        select: {'_id': true, 'components': true},
        populate: {
          path: 'components',
          select: {'_id': true}
        }
      })
      .exec((err, result)=>{
        if (err){
          return res.status(500).json({
            message: 'Server error'
          })
        } else if (!result){
          return res.status(404).json({
            message: 'Not found suitable data'
          })
        } else if (result){
          result.pages.forEach(page => {
            page.components.forEach(component => {
              Component.remove({_id: component._id})
            })
            Page.remove({_id: page._id})
          });
          Survey.remove({_id: result._id})
          Result.remove({survey_id: req.body.result_id})
            .exec((err)=>{
              if (err){
                return res.status(500).json({
                  message: 'Server error'
                })
              }
              return res.status(200).json({
                message: 'Success'
              })
            })
        }
      })
  })

router.route('/edit')
  .get(function(req, res) {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })
    
  })
  .post(function(req, res) {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })
    user.save(function(err) {
      if (err) return res.status('505').json({ message: 'fail' });
      return res.status('201').json({ message: 'ok' });
      
    })
  })
module.exports = router
