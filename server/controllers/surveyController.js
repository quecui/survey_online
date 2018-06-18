const Survey = require('../models/survey');
const User = require('../models/user');
const Page = require('../models/page');
const Result = require('../models/result');

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
        console.log(survey)
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
          target: req.body.target
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
        active: true
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
  detailSurvey: detailSurvey
}