/*********************************************************************************
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Kush Patel Student ID: 104006218 Date: 20th Jan, 2023________________
* Cyclic Link: https://rich-ruby-bonobo-cap.cyclic.app/
*
********************************************************************************/ 



var express = require('express');
var path = require('path');
var MoviesDB = require('./modules/moviesDB.js');
const db = new MoviesDB();
const cors = require('cors');
const app = express();
var HTTP_PORT = process.env.PORT || 8080;
app.use(cors());
const dotenv = require('dotenv').config();
app.use(express.json());

app.use(express.urlencoded({extended: true}));

// call this function after the http server starts listening for requests
var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
// function onHTTPStart() {
//   console.log('Express http server listening on: ' + HTTP_PORT);
// }

// app.listen(HTTP_PORT, onHTTPStart);
//app.get()
app.get('/', (req, res) => {
    res.json({message: 'API Listening'});
})

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });

app.post('/api/movies', async (req, res) => {
    // try {
    //   const newMovie = await db.addNewMovie(req.body);
    //   res.status(201).json(newMovie);
    // } catch (err) {
    //   res.status(500).send(err);
    // }


    db.addNewMovie(req.body)
    .then((newMovie) => {res.json(newMovie)})
    .catch((err) => {
      res.status(500).send(err)
    })
  });

  app.get('/api/movies', async (req, res) => {
      let { page, perPage, title } = req.query;
      db.getAllMovies(page,perPage,title)
      .then((movies)=>{
        res.json(movies)
       // console.log(movies)
      })
      .catch((error)=>{
        //console.log(error)
        res.status(500).send({message:error.message})
      })
  });

  app.get('/api/movies/:id', async (req, res) => {
    // try {
    //   const movie = await db.getMovieById(req.params.id);
    //   if (!movie) {
    //     res.status(404).send("Movie not found");
    //   } else {
    //     res.json(movie);
    //   }
    // } catch (err) {
    //   res.status(500).send(err);
    // }
    //console.log(req.params.id)
    db.getMovieById(req.params.id)
    .then((movie) => {
        console.log(movie)
        res.json(movie)
      }
    )
    .catch((err) => {
      console.log(err);
        res.status(500).send({message: `Movie with _id${req.params.id}`});
      })
  });

  app.put('/api/movies/:id', async (req, res) => {
    // try {
    //   const result = await db.updateMovieById(req.body, req.params.id);
    //   if (result.n === 0) {
    //     res.status(404).send("Movie not found");
    //   } else if (result.nModified === 0) {
    //     res.status(204).send("No changes made");
    //   } else {
    //     res.status(200).send("Movie updated successfully");
    //   }
    // } catch (err) {
    //   res.status(500).send(err);
    // }

    db.updateMovieById(req.body, req.params.id)
    .then((resul) => {
      res.status(200).send("Movie updated successfully");
    }).catch((err) => {
      res.status(500).send(err);
    })
    // db.updateMovieById(req.body,req.params.id)
    // .then((result) => {
    //   res.json(result);
    // }).catch(err => {
    //   res.status(201).send({message: 'err'});
    // })
  });

  app.delete('/api/movies/:id', async (req, res) => {
    // try {
    //   const result = await db.deleteMovieById(req.params.id);
    //   if (result.n === 0) {
    //     res.status(404).send("Movie not found");
    //   } else {
    //     res.status(200).send("Movie deleted successfully");
    //   }
    // } catch (err) {
    //   res.status(500).send(err);
    // }
    db.deleteMovieById(req.params.id)
    .then((result) => {
      res.json(result);
    }).catch((err) => {
      res.status(500).send({message: `Movies failed successfully`});
    })
  });