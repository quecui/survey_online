const mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
function getDatabaseUri() {
  if (process.env.NODE_ENV === 'test') return 'mongodb://localhost/survey-test'
  return 'mongodb://localhost/survey_online_storm'
}

mongoose.connect(getDatabaseUri()).catch(() => {
  process.exit(1)
})
