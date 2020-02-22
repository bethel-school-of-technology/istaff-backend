var express = require('express');
var router = express.Router();
const mysql = require('mysql');

// var staticModels = require('../users/admin');
// router.get('/admin', function (req, res, next) {
//   res.send(JSON.stringify(
//     staticModels.admin
//   ));
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
