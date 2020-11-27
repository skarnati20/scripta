var express = require('express');
var bodyParser= require('body-parser')
var MongoClient = require('mongodb').MongoClient
var router = express.Router();

require('dotenv').config();

// setting up mongodb database
MongoClient.connect('mongodb+srv://skarnati20:hello@cluster0.nd5q4.mongodb.net/<dbname>?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.error(err)
  
// creating database and neccesary collections
  var db = client.db('notes')
  var notesCollection = db.collection('text')
  var annotationsCollection = db.collection('annotations')
  var excerptCollection = db.collection('excerpts')
  
  console.log("Database set up")

  router.use(bodyParser.urlencoded({ extended: true }))
  
// get request for all the texts that have been submitted
  router.get('/text', (req,res) => {
    db.collection('text').find().toArray().then(results => {
      res.json(results);
      console.log("data requested")
    })
    .catch(error => console.error(error))
  });
  
// post request for text that is being submitted
  router.post('/text', (req, res) => {
    notesCollection.insertOne(req.body)
    .then(results => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  });
  
// delete request that deletes everything from the collections
  router.delete('/delete', (req, res) => {
    notesCollection.deleteMany({})
    .then(results => {
      res.redirect('/')
    })
    annotationsCollection.deleteMany({})
    .then(results => {
      res.redirect('/')
    })
    excerptCollection.deleteMany({})
    .then(results => {
      res.redirect('/')
    })
  });

// get request to get access to the user's notses
  router.get('/notes', (req, res) => {
    db.collection('annotations').find().toArray().then(results => {
      res.json(results);
      console.log("notes requested")
    })
    .catch(error => console.error(error))
  });
  
// post request to make a new note
  router.post('/notes', (req, res) => {
    annotationsCollection.insertOne(req.body)
    .then(results => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  });

// get request to get access to quotes
  router.get('/excerpts', (req, res) => {
    db.collection('excerpts').find().toArray().then(results => {
      res.json(results);
    })
    .catch(error => console.error(error))
  });
  
// post request to upload the users' selected quotes
  router.post('/excerpts', (req, res) => {
    excerptCollection.insertOne(req.body)
    .then(results => {
      res.redirect('/')
      console.log(excerptCollection.find().toArray())
    })
    .catch(error => console.error(error))
  });

})

module.exports = router;
