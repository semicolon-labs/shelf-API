/**
* This file accounts for all database transactions
* Implements
* 1. getCities()
* 2. getClients()
*/

//Include modules
var pgp = require('pg-promise')();
var config = require('./../config/config.js');

//POOL config
var pool = pgp(config.DBMS_CONFIG);

/**
 * If user details does not exist in the database, create new user.
 */
exports.checkUserExists = function(userData, callback){
  getUniversityId(userData.domain, function(id){
      pool.none(`INSERT INTO shelf.users(username, email, uid) 
                    SELECT $1, $2, $3
                    WHERE NOT EXISTS(
                      SELECT username, email FROM shelf.users WHERE email = $2
                    )`, [userData.username, userData.email, id])
      .then(function(){
        callback("done");
      })
      .catch(function(error){
        console.log(error);
        callback("error");
      });
  });
}

/**
 * Returns university id from domain
 */
function getUniversityId(domain, callback){
  pool.one('SELECT name FROM shelf.universities WHERE domain=$1', [domain])
  .then(function(data){
    callback(data.id);
  })
  .catch(function(error){
    callback("error");
  });
}

module.exports = getUniversityId;