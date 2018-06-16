const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

router.route('/create')
  .post(surveyController.createSurvey)

router.route('/edit')
  .post(surveyController.editSurvey)

router.route('/delete')
  .post(surveyController.deleteSurvey)

router.route('/getLink')
  .post(surveyController.getLinkSurvey)

router.route('/publish')
  .post(surveyController.publishSurvey)

router.route('/getAll')
  .post(surveyController.getAllSurvey)

router.route('/statistical')
  .post(surveyController.statisticalSurvey)

router.route('/detail')
  .post(surveyController.detailSurvey)
  
module.exports = router;