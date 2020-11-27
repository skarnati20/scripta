var express = require('express');
var bodyParser= require('body-parser')
var MongoClient = require('mongodb').MongoClient
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

MongoClient.connect('mongodb+srv://skarnati20:hello@cluster0.nd5q4.mongodb.net/<dbname>?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.error(err)
  var db = client.db('notes')
  var notesCollection = db.collection('text')
  var annotationsCollection = db.collection('annotations')
  var excerptCollection = db.collection('excerpts')

  console.log("Database set up")

  router.use(bodyParser.urlencoded({ extended: true }))

  router.get('/text', (req,res) => {
    db.collection('text').find().toArray().then(results => {
      res.json(results);
      console.log("data requested")
    })
    .catch(error => console.error(error))
  });

  router.post('/text', (req, res) => {
    notesCollection.insertOne(req.body)
    .then(results => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  });

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

  router.get('/notes', (req, res) => {
    db.collection('annotations').find().toArray().then(results => {
      res.json(results);
      console.log("notes requested")
    })
    .catch(error => console.error(error))
  });
  router.post('/notes', (req, res) => {
    annotationsCollection.insertOne(req.body)
    .then(results => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  });

  router.get('/excerpts', (req, res) => {
    db.collection('excerpts').find().toArray().then(results => {
      res.json(results);
    })
    .catch(error => console.error(error))
  });

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
