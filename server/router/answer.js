const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answererController');

router.route('/getSurvey')
  .post(answerController.getSurvey)

router.route('/answerSurvey')
  .post(answerController.answerSurvey)
  
module.exports = router;