var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup',function (req,res, next){
});

router.get('/login', function (req, res, next) {
  res.render('login');
})

router.post('/login', function (req, res, next) {
});

router.get('/admin', function (req, res, next) {
});

router.get('/logout', function (req, res, next) {
  console.log('Logging User Out....');
  res.cookie('jwt', '', { expires: new Date(0) });
  console.log('User is Now Logged Out....');
  res.redirect('/users/login');
});

module.exports = router;
