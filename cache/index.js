var redis = require('redis');
var Promise = require("bluebird");

var client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URL);
client.auth(process.env.REDIS_PASSWORD);
client = Promise.promisifyAll(client);

module.exports.addUsersToCache = function(users) {
  return client.msetAsync(users);
}

module.exports.filterCachedUsers = function(users) {
  var cachedUsers = [];
  var promises = [];

  return Promise.some(Promise.map(users, function(user) {

      return client.getAsync(user).then(function(result) {
        console.log("RESULT: " + result);
        if(result) {
          console.log("*******");
          cachedUsers.push(result);
        }
        return cachedUsers;
      });

  }), 1);

  // promises.push(Promise.map(users, function(user) {
  //
  //   return client.getAsync(user).then(function(result) {
  //     console.log("RESULT: " + result);
  //     if(result) {
  //       console.log("*******");
  //       cachedUsers.push(result);
  //     }
  //     return cachedUsers;
  //   });
  // }));

  // return Promise.all(promises);
}
