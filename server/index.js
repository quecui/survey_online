const app = require('./app')
require('./infra/connectDatabase')

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
