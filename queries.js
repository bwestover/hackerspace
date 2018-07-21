var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

const { DATABASE_URL } = process.env;
var pgp = require('pg-promise')(options);
var connectionString = DATABASE_URL;
var db = pgp(connectionString);


module.exports = {
  getAllHackers: getAllHackers,
  getSingleHacker: getSingleHacker//,
  //createHacker: createHacker,
  //updateHacker: updateHacker,
  //removeHacker: removeHacker
};

function getAllHackers(req, res, next) {
 db.any('select * from hackers')
   .then(function (data) {
     res.status(200)
       .json({
         status: 'success',
         data: data,
         message: 'Retrieved ALL hackers'
       });
   })
   .catch(function (err) {
     return next(err);
   });
console.log("in getAllHackers function")
}

function getSingleHacker(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from hackers where id = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE hacker'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createHacker(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into hackers(name, languages, frameworks, databases, idea)' +
      'values(${name}, ${languages}, ${frameworks}, ${databases}, ${idea})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one hacker'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
