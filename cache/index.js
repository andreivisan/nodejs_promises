var redis = require('redis');
var Promise = require("bluebird");

var client = redis.createClient(process.env.REDIS_TEST_PORT, process.env.REDIS_TEST_URL);
client.auth(process.env.REDIS_PASSWORD);
client = Promise.promisifyAll(client);

module.exports.addUsersToCache = function(users) {
  return client.msetAsync(users);
}

module.exports.filterCachedUsers = function(users) {
  var cachedUsers = [];

  return Promise.any(Promise.map(users, function(user) {

    return client.getAsync(user).then(function(result) {
      if(result) {
        cachedUsers.push(result);
      }
      return cachedUsers;
    });

  }));

}

module.exports.filterCachedUsersMapReduce = function(users) {
  var cachedUsers = [];

  return Promise.map(users, function(user) {

    return client.getAsync(user).then(function(result) {
      if(result) {
        cachedUsers.push(result);
      }
      return cachedUsers;
    });

  }).reduce(function(cachedUsersResult) {
    return cachedUsersResult;
  });
}

module.exports.optimizedFilterCachedUsers = function(users) {
  var cachedUsers = [];

  return Promise.map(users, function(user) {
    return client.getAsync(user).then(function(result) {
      if(result) {
        return result;
      }
    });
  });

}
