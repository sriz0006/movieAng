// https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const actors = require('./routes/actor')
const movies = require('./routes/movie')
const path = require('path')
const app = express()
app.listen(8080)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, 'dist/movieAng')))
mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) {
    return console.log('Mongoose - connection error:', err)
  }
  console.log('Connect Successfully')
})
// Configuring Endpoints
// Actor RESTFul endpoionts
app.get('/actors', actors.getAll)
app.post('/actors', actors.createOne)
app.get('/actors/:id', actors.getOne)
app.put('/actors/:id', actors.updateOne)
app.post('/actors/:id/:movieId', actors.addMovie)
app.delete('/actors/:id', actors.deleteOne)
app.delete('/actors/:actorId/:movieId', actors.removeMovie)

// Movie RESTFul  endpoints
app.get('/movies', movies.getAll)
app.post('/movies', movies.createOne)
app.get('/movies/:id', movies.getOne)
app.put('/movies/:id', movies.updateOne)
app.delete('/movies/:id', movies.deleteOne)
app.delete('/movies/:movieId/:actorId', movies.removeActor)
app.post('/movies/:movieId/:actorId', movies.addActor)
app.get('/movies/:year1/:year2', movies.getAllYear)
