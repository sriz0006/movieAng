var Actor = require('../models/actor')
var Movie = require('../models/movie')
const mongoose = require('mongoose')
module.exports = {

  getAll: function (req, res) {
    Movie.find({}).populate('actors').exec(function (err, movies) {
      if (err) return res.status(400).json(err)
      res.json(movies)
    })
  },

  createOne: function (req, res) {
    const newMovieDetails = req.body
    newMovieDetails._id = new mongoose.Types.ObjectId()
    // Movie.create(newMovieDetails).exec(function (err, movie) {
    //   if (err) return res.status(400).json(err)
    //   console.log(movie)
    //   console.log('done');
    //   res.json(movie)
    // })
    console.log(newMovieDetails)
    const movie = new Movie(newMovieDetails)
    movie.save(function (err, movie) {
      if (err) {
        console.log(err)
      } else {
        res.json(movie)
      }
    })
  },

  getOne: function (req, res) {
    Movie.findOne({ _id: req.params.id })
      .populate('actors')
      .exec(function (err, movie) {
        if (err) return res.status(400).json(err)
        if (!movie) return res.status(404).json()
        res.json(movie)
      })
  },
  updateOne: function (req, res) {
    const movieID = new mongoose.Types.ObjectId(req.params.id)
    Movie.findOneAndUpdate({ _id: movieID }, req.body, function (err, movie) {
      if (err) return res.status(400).json(err)
      if (!movie) return res.status(404).json()
      res.json(movie)
    })
  },
  deleteOne: function (req, res) {
    const movieID = new mongoose.Types.ObjectId(req.params.id)
    Movie.findOneAndDelete({ _id: movieID }, req.body.id, function (err) {
      if (err) return res.status(400).json(err)
      res.json()
    })
  },
  removeActor: function (req, res) {
    const movieID = new mongoose.Types.ObjectId(req.params.movieId)
    const actorID = new mongoose.Types.ObjectId(req.params.actorId)

    Movie.findOne({ _id: movieID }, function (err, movie) {
      if (err) return res.params.status(400).json(err)
      if (!movie) return res.status(404).json()
      Actor.findOne({ _id: actorID }, function (err, actor) {
        if (err) return res.status(400).json()
        if (!movie) return res.status(404).json()
        movie.actors.removeOne(actor._id)
        movie.save(function (err) {
          if (err) return res.status(500).json(err)
          res.json(movie)
        })
      })
    })
  },
  addActor: function (req, res) {

    Movie.update({ _id: req.params.movieId }, { $addToSet: { actors: req.params.actorId } },
      function (err, movie) {
        if (err) return res.status(400).json()
        if (!movie) return res.status(404).json()
        res.json(movie)
      })
    // const movieID = new mongoose.Types.ObjectId(req.params.movieId)
    // const actorID = new mongoose.Types.ObjectId(req.params.actorId)

    // Movie.findOne({ _id: movieID }, function (err, movie) {
    //   if (err) return res.status(400).json(err)
    //   if (!movie) return res.status(404).json()
    //   Actor.findOne({ _id: actorID }, function (err, actor) {
    //     if (err) return res.status(400).json(err)
    //     if (!actor) return res.status(404).json()
    //     movie.actors.push(actor._id)
    //     movie.save(function (err) {
    //       if (err) return res.status(500).json(err)
    //       res.json(movie)
    //     })
    //   })
    // })
  },
  getAllYear: function (req, res) {
    const movieID = new mongoose.Types.ObjectId(req.params.movieId)
    const year1 = req.params.year1
    const year2 = req.params.year2

    Movie.wher({ _id: movieID }).where('year').gte(year2).where('year').lte(year1).exec(function (err, movie) {
      if (err) return res.status(400).json(err)
      if (!movie) return res.status(404).json()
      movie.populate('actors').exec(err, function (err, movies) {
        if (err) return res.json(err)
        if (!movies) return res.json()
        res.json(movies)
      })
    })
  }
}
