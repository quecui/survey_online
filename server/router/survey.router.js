const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Survey = require('../models/survey');
const app = express()
var session = require('express-session')
const User = require('../models/user');
const Page = require('../models/page');
const Result = require('../models/result');

router.route('/')
  .post(function(req, res) {
    var token = req.body.token;
    var data = {
      name: req.body.surveyName,
      description: '',
      pages: []
    }
    if (token === undefined) {
      return res.status('401').json({ message: "Session Timeout. Please login!"});
    }
    Survey.findOne(
      {
        name: data.name
      },
      (err, result)=>{
        if (err){
          return res.status('404').json({message: 'Not found!'});
        }
        if (result){
          return res.status('404').json({message: 'Survey exist!'});
        } else{
          Survey.create(data, (err, survey)=>{
            if (err){
              return res.status('500').json({message: 'Error with server!'});
            }
            User.findByIdAndUpdate(
              token,
              {
                $push: {surveys: survey._id}
              },
              (err, user)=>{
                if (err) {
                  return res.status('500').json({message: 'Error with server!'});
                }
                return res.status('200').json({message: "Success!"});
              }
            )
          })
        }
      }
    )
  })

router.route('/all')
  .post(function (req, res) {
    var token = req.body.token;
    if (token === undefined) {
      return res.status('401').json({ message: "Session Timeout. Please login!"});
    }
    User.findById(token)
      .populate({
        path: 'surveys'
      })
      .select('surveys')
      .exec((err, result)=>{
        if (err) {
          return res.status('404').json({message: 'Not found!'});
        }
        var dataSurvey = [];
        result.surveys.forEach(element=>{
          dataSurvey.push({
            _id: element._id,
            surveyName: element.name
          })
        })
        return res.status('200').json({message: "Success!", dataReq: dataSurvey});
      })
  })

router.route('/detail')
  .post(function (req, res) {
    var token = req.body.token;
    var survey_id = req.body.survey_id;
    if (token === undefined) {
      return res.status('401').json({ message: "Session Timeout. Please login!"});
    }
    User.findById(token)
      .exec((err, result)=>{
        if (err) {
          return res.status('404').json({message: 'Not found!'})
        }
        Survey.findById(survey_id)
          .populate('pages')
          .exec((err, survey)=>{
            if (err) {
              return res.status('404').json({message: 'Not found!'})
            }
            return res.status('200').json({message: "Success!", dataReq: survey})
          })
      })
  })

router.route('/delete')
  .post(function (req, res) {
    var token = req.body.token;
    var survey_id = req.body.survey_id;
    if (token === undefined) {
      return res.status('401').json({ message: "Session Timeout. Please login!"});
    }
    Survey.findById(
      survey_id,
      (err, survey)=>{
        if (err){
          return res.status('404').json({message: 'Not found!'})
        }
        User.findOneAndUpdate(
          {
            _id: token,
            surveys: {$in: [survey_id]}
          },
          {
            $pull: {surveys: survey_id}
          },
          (err, result)=>{
            // if (err || !result) { hom qua loi xoa la do khong co thang bi xoa trong db, neu muon bat loi thi them !result
            if (err) {
              return res.status('404').json({message: 'Not found!'})
            }
            Survey.findByIdAndRemove(survey_id)
              .exec((err, survey)=>{
              console.log(123)
                if (err) {
                  return res.status('500').json({message: 'Error with server!'})
                }
                if (!survey.pages || survey.pages.length == 0){
                  return res.status('200').json({message: "Success!"});
                } else{
                  for (let index = 0; index <= survey.pages.length; index++) {
                    console.log(index)
                    if (index == survey.pages.length){
                      return res.status('200').json({message: "Success!"});
                    }
                    Page.findByIdAndRemove(survey.pages[index]).exec();
                  }
                }
              })
          }
        )
      }
    )
  })

router.route('/edit')
  .post(function (req, res) {
    var token = req.body.token;
    var survey_id = req.body.survey_id;
    var description = req.body.description;
    var name = req.body.surveyName;
    var pages = req.body.pages;
    if (token === undefined) {
      return res.status('401').json({ message: "Session Timeout. Please login!"});
    }
    User.findOne({
        _id: token,
        surveys: {$in: [survey_id]}
      })
      .exec((err, result)=>{
        if (err) {
          return res.status('404').json({message: 'Not found!'})
        }
        Survey.findById(
          survey_id,
          (err, result)=>{
            if(err){
              return res.status('500').json({message: 'Error with server!'})
            }
            for (let index = 0; index < result.pages.length; index++) {
              Page.findByIdAndRemove(result.pages[index]).exec();
            }
            pages.forEach(element => {
              Page.create(element, (err, page)=>{
                if (err){
                  return res.status('500').json({message: 'Error with server!'})
                }
                Survey.findByIdAndUpdate(
                  survey_id,
                  {
                    $push: {pages: page._id}
                  }).exec()
              })
            });
            Survey.findByIdAndUpdate(
              survey_id,
              {
                $set: {
                  name: name,
                  description: description
                }
              },
              (err, survey)=>{
                if (err){
                  return res.status('500').json({message: 'Error with server!'})
                }
                return res.status('200').json({message: 'Success!'})
              }
            )
          }
        )
      })
  })

router.route('/results')
  .post(function (req, res) {
    var token = req.body.token;
    var survey_id = req.body.survey_id;
    if (token === undefined) {
      return res.status('401').json({ message: "Session Timeout. Please login!"});
    }
    User.findOne({
        _id: token,
        surveys: {$in: [survey_id]}
      })
      .exec((err, result)=>{
        if (err) {
          return res.status('404').json({message: 'Not found!'});
        }
        Survey.aggregate([
          {
            $lookup: {
              from: 'page',
              localField: 'pages',
              foreignField: '_id',
              as: 'pages'
            }
          },
          {
            $lookup: {
              from: 'result',
              localField: '_id',
              foreignField: 'survey_id',
              as: 'results'
            }
          },
          {
            $match: {
              _id: mongoose.Types.ObjectId(survey_id)
            }
          }
        ])
        .exec((err, survey)=>{
          if(err){
            return res.status('404').json({message: 'Not found!'});
          }
          return res.status('200').json({message: "Success!", dataReq: survey})
        })
      })
  })

router.route('/answer')
  .post(function (req, res) {
    var data = {
      survey_id: req.body.survey_id,
      responses: req.body.responses
    }
    Result.create(data, (err, result)=>{
      if(err){
        return res.status('500').json({message: 'Error with server!'})
      }
      return res.status('200').json({message: 'Success!'})
    })
  })

router.route('/get')
  .post(function (req, res) {
    var survey_id = req.body.survey_id;
    Survey.findById(survey_id)
      .populate('pages')
      .exec((err, survey)=>{
        if (err) {
          return res.status('404').json({message: 'Not found!'})
        }
        return res.status('200').json({message: "Success!", dataReq: survey})
      })
  })

module.exports = router
