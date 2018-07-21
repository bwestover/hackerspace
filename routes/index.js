var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/hello-world', function(req, res, next) {
  res.send('hello world');
});

//router.get('/api/hackers', function(req, res, next) {
//  console.log("Hello brett");
//  res.send('blah');
//
//  return db.getAllHackers;
//}); //db.getAllhackers
router.get('/api/hackers', db.getAllHackers);
//router.get('/api/hackers/:id', db.getSingleHacker);
//router.post('/api/hackers', db.createHacker);
//router.put('/api/hackers/:id', db.updateHacker);
//router.delete('/api/hackers/:id', db.removeHacker);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
