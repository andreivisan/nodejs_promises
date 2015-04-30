var express = require('express');
var router = express.Router();
var cache = require('../cache/index.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  cache.addUsersToCache(["user1", "TestUser1", "user2", "TestUser2", "user3", "TestUser3"]).then(function() {
    res.render('index', {
      title: 'Express',
      users: null});
  });
});

router.get('/get-cached-users', function(req, res) {
  cache.filterCachedUsersMapReduce(["user1", "user2", "user3", "user4"]).then(function(results) {
    console.log(results[0]);
    res.render('index', {
      title: 'Express',
      users: results});
  })
});

module.exports = router;
