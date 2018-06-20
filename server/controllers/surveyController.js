const Survey = require('../models/survey');
const User = require('../models/user');
const Page = require('../models/page');
const Result = require('../models/result');
const nodemailer = require('nodemailer');
const async = require('async');

function createSurvey(req, res) {
  let token = req.body.token;
  // Chu y time! lech 7h
  let survey = new Survey({
    name: req.body.name,
    time: req.body.time,
    target: req.body.target
  })
  checkToken(token, res)
  survey.save(function(err) {
    if (err) res.status('500').json({message: 'Error with server!'});
    User.findByIdAndUpdate(
      token,
      {
        $push: {surveys: survey._id}
      },
      (err, user)=>{
        if (err) {
          return res.status('500').json({message: 'Error with server!'});
        }
        return res.status('200').json({message: 'Success!', dataReq: survey});
      }
    )
  })
}

async function editSurvey(req, res) {
  let token = req.body.token;
  let survey_id = req.body.survey_id;
  let pages = req.body.pages;
  checkToken(token, res)
  try {
    let checkSurveyInUser = await User.findOne({
      _id: token,
      surveys: {
        $in: [survey_id]
      }
    })
    if(!checkSurveyInUser)
      return res.status('500').json({message: 'Survey is not exit!'})
  } catch (error) {
    return res.status('500').json({message: 'Survey is not exit!'})
  }
  try {
    // chu y nen ko cho chinh sua neu survey da duoc kich hoat
    let updateSurvey = await Survey.findOneAndUpdate(
      {
        _id: survey_id,
        active: false
      },
      {
        $set: {
          name: req.body.name,
          time: req.body.time,
          target: req.body.target,
          star: req.body.star
        }
      }
    )
    if (updateSurvey){
      // Xoa cac page cu
      for (let index = 0; index < updateSurvey.pages.length; index++) {
        Page.findByIdAndRemove(updateSurvey.pages[index]).exec();
      }
      Survey.findByIdAndUpdate(
        survey_id,
        {
          $unset: {
            pages:1
          }
        }
      ).exec()
      // Tao cac page moi
      pages.forEach(async element => {
        let creatPage = await Page.create(element)
        // update page vao pages trong survey
        Survey.findByIdAndUpdate(
          survey_id,
          {
            $push: {pages: creatPage._id}
          }).exec()
      })
    }
  } catch (error) {
    return res.status('500').json({message: 'Error with server!'})
  }
  res.status('200').json({message: 'Success!'})
}

async function deleteSurvey (req, res) {
  let token = req.body.token;
  let survey_id = req.body.survey_id;
  checkToken(token, res)
  try {
    let survey = await Survey.findById(survey_id)
    if (!survey)
      return res.status('404').json({message: 'Survey is not exit!'})
  } catch (error) {
    return res.status('404').json({message: 'Survey is not exit!'})
  }
  try {
    let user = await User.findOneAndUpdate(
      {
        _id: token,
        surveys: {$in: [survey_id]}
      },
      {
        $pull: {surveys: survey_id}
      }
    )
    if (user){
      let removeSurvey =  await Survey.findByIdAndRemove(survey_id)
      if (removeSurvey){
        for (let index = 0; index < removeSurvey.pages.length; index++) {
          Page.findByIdAndRemove(removeSurvey.pages[index]).exec();
        }
        if (removeSurvey.active == true){
          Result.deleteMany({survey_id: survey_id}).exec();
        }
      }
    }
  } catch (error) {
    return res.status('500').json({message: 'Error with server!'})
  }
  return res.status('200').json({message: "Success!"});
}

function getLinkSurvey (req, res) {
  let token = req.body.token;
  let survey_id = req.body.survey_id;
  checkToken(token, res)
  User.findOne({
      _id: token,
      surveys: {$in: [survey_id]}
    })
    .exec((err, user)=>{
      if (err || !user){
        return res.status('404').json({message: 'Survey is not exit!'})
      }
      // can chinh sua thong nhat ve link lay ra
      return res.status('200').json({message: "Success!", dataReq: {link: survey_id}});
    })
}

function publishSurvey (req, res) {
  let token = req.body.token;
  let survey_id = req.body.survey_id;
  checkToken(token, res)
  Survey.findByIdAndUpdate(
    survey_id,
    {
      $set: {
        active: true,
        datePublish: new Date()
      }
    },
    (err, result) => {
      if (err || !result){
        return res.status('404').json({message: 'Survey is not exit!'})
      }
      return res.status('200').json({message: "Success!"});
    }
  )
}

function getAllSurvey (req, res) {
  let token = req.body.token;
  checkToken(token, res)
  User.findById(token)
    .populate({
      path: 'surveys'
    })
    .select('surveys')
    .exec((err, result)=>{
      if (err || !result) {
        return res.status('404').json({message: 'Surveys is not exist!'});
      }
      return res.status('200').json({message: "Success!", dataReq: result});
    })
}

function detailSurvey (req, res) {
  let token = req.body.token;
  let survey_id = req.body.survey_id;
  checkToken(token, res)
  User.findById(token)
    .exec((err, result)=>{
      if (err || !result) {
        return res.status('401').json({message: 'User is not exist!'})
      }
      Survey.findById(survey_id)
        .populate('pages')
        .exec((err, survey)=>{
          if (err || !survey) {
            return res.status('404').json({message: 'Survey is not exist!'})
          }
          return res.status('200').json({message: "Success!", dataReq: survey})
        })
    })
}

function statisticalSurvey (req, res) {
  let token = req.body.token;
  let survey_id = req.body.survey_id;
  checkToken(token, res)
  Survey.findById(
    survey_id,
    (err, survey) => {
      if (err || !survey){
        return res.status('404').json({message: 'Survey is not exit!'})
      }
      Result.find(
        {
          survey_id: survey_id
        },
        (err, results) => {
          if (err || !results){
            return res.status('412').json({message: "Survey dont't have any result!"})
          }
          return res.status('200').json({message: "Success!", dataReq: results});
        }
      )
    }
  )
}

function notifySurvey (){
  let CronJob = require('cron').CronJob;
  let job = new CronJob('*/2 * * * *', async function() {
      try {
        // can them check neu nhung cai nao da duoc gui tin nhan roi thi thoi
        let allUser = await User.find();

        for(let index = 0; index < allUser.length; index++){
          let user = allUser[index]
          let listSurvey = [];
          for(let i= 0; i < user.surveys.length; i++){
            let surveyId = user.surveys[i]
            let survey = await Survey.findOne({
              _id: surveyId,
              active: true,
              complete: {$lt: 2}
            });
            if (survey){
              let resultNumber = await Result.count({survey_id: survey._id});
              let dateNow = new Date();
              let dateHaft = (survey.time + survey.datePublish)/2;
              if (dateNow >= survey.time){
                listSurvey.push({name: survey.name, target: survey.target, result: resultNumber});
                await Survey.findByIdAndUpdate(
                  survey._id,
                  {
                    $set: {
                      complete: 2
                    }
                  }
                )
              }
              else if(dateNow >= dateHaft && survey.checkHaftTime == 0){
                listSurvey.push({name: survey.name, target: survey.target, result: resultNumber});
                await Survey.findByIdAndUpdate(
                  survey._id,
                  {
                    $set: {
                      complete: 1,
                      checkHaftTime: 1
                    }
                  }
                )
              }
              else if(resultNumber >= survey.target){
                listSurvey.push({name: survey.name, target: survey.target, result: resultNumber});
                await Survey.findByIdAndUpdate(
                  survey._id,
                  {
                    $set: {
                      complete: 2
                    }
                  }
                )
              }
              else if (resultNumber >= survey.target/2 && survey.checkHaftTarget == 0){
                listSurvey.push({name: survey.name, target: survey.target, result: resultNumber});
                await Survey.findByIdAndUpdate(
                  survey._id,
                  {
                    $set: {
                      complete: 1,
                      checkHaftTarget: 1
                    }
                  }
                )
              }
            }
          }
          if (listSurvey.length > 0){
            let dataSend = `
              <p>Một vài survey bạn đã đem đi khảo sát đã đạt yêu cầu đề ra hoặc phân nửa yêu cầu</p>
              <p>Bạn hãy đăng nhập vào kệ thống để có thể thống kê kết quả và xem các câu trả lời</p>
              <p>Bạn hãy truy cập link sau <a href="http://localhost:3000/survey">Click<a><p>
              <ul>Sau đó truy cập các survey:`
            for(let j = 0; j < listSurvey.length; j++){
              dataSend = dataSend + '<li>' + 'Tên survey: ' + listSurvey[j].name + ', mục tiêu khảo sát: ' + listSurvey[j].target + ', số lượng hiện tai: ' + listSurvey[j].result + '</li>'
            }
            dataSend += '</ul>'

            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'projectsurvey123456789@gmail.com',
                pass: '123456789@a'
              }
            });

            let mailOptions = {
              from: 'projectsurvey123456789@gmail.com',
              to: user.email,
              subject: 'Some survey of you are complete!',
              text: dataSend,
              html: dataSend
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
              }
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, function () {
      console.log("DONE!");/* This function is executed when the job stops */
    },
    true, /* Start the job right now */
    'Asia/Ho_Chi_Minh' /* Time zone of this job. */
  );
}

function checkToken(token, res){
  if (token === undefined) {
    return res.status('401').json({ message: 'Session Timeout. Please login!'});
  }
}

module.exports = {
  createSurvey: createSurvey,
  editSurvey: editSurvey,
  deleteSurvey: deleteSurvey,
  getLinkSurvey: getLinkSurvey,
  publishSurvey: publishSurvey,
  getAllSurvey: getAllSurvey,
  statisticalSurvey: statisticalSurvey,
  notifySurvey: notifySurvey,
  detailSurvey: detailSurvey
}
