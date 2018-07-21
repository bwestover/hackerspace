var express = require('express');
var router = express.Router();

var db = require('../queries');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/api/hackers', db.getAllHackers);
router.get('/api/hackers/:id', db.getSingleHacker);
router.post('/api/hackers', db.createHacker);
router.put('/api/hackers/:id', db.updateHacker);
//router.delete('/api/hackers/:id', db.removeHacker);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
