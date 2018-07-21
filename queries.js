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
  getAllHackers: getAllHackers
}; //,
  //getSingleHacker: getSingleHacker,
  //createHacker: createHacker,
  //updateHacker: updateHacker,
  //removeHacker: removeHacker
//};

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