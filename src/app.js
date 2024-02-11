const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')

const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found')

  error.status = 404

  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)

  res.json({
    error: {
      message: error.message
    }
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
