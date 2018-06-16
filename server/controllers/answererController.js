const Survey = require('../models/survey');
const Page = require('../models/page');
const Result = require('../models/result');

function getSurvey(req, res) {
  let survey_id = req.body.survey_id;
  Survey.findOne({
      _id: survey_id,
      active: true
    })
    .populate('pages')
    .exec((err, survey)=>{
      if (err || !survey) {
        return res.status('404').json({message: 'Survey is not exist!'})
      }
      return res.status('200').json({message: "Success!", dataReq: survey})
    })
}

function answerSurvey(req, res) {
	let result = new Result({
    survey_id: req.body.survey_id,
    data: req.body.data
  })
  result.save(function(err) {
    if (err) res.status('500').json({message: 'Error with server!'});
    return res.status('200').json({message: 'Success!'})
  })
}

module.exports = {
  getSurvey: getSurvey,
  answerSurvey: answerSurvey
}