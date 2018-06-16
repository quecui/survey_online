const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.route('/signin')
  .post(accountController.signin)

router.route('/token')
  .post(accountController.signinRepeat)

router.route('/register')
  .post(accountController.register)

module.exports = router
