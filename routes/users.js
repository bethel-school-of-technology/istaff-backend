var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

//LOGIN POST ROUTE
router.post('/login', function (req, res, next) {
    models.users.findOne({
        where: { Username: req.body.Username }
    })
        .then(user => {
            if (!user) {
                console.log('Invalid Login Attempt!')
                res.render('badlogin');
                return
            } else {
                let passwordMatch = authService
                    // CHECK IF THE PASSWORD MATCHES
                    .comparePassword(req.body.Password, user.Password);
                if (passwordMatch) {
                    let token = authService.signUser(user);
                    res.cookie('jwt', token);
                    // IS THE USERS ACCOUNT SET TO DELETED?
                    if (user.Deleted) {
                        res.cookie('jwt', '', { expires: new Date(0) });
                        res.render('deleted');
                    } else {
                        // IF USER ADMIN DIRECT TO ADMIN PAGE
                        if (user.Admin) {
                            console.log('REDIRECTING TO ADMIN PAGE....');
                            res.redirect('admin');

                        } else {
                            // IF USER NOT ADMIN, DIRECT TO PROFILE
                            res.redirect('profile');
                        }
                    }
                } else {
                    console.log("Invalid Credentials!");
                    res.render('badlogin');
                }
            }
        })
});

//LOGIN GET ROUTE
router.get('/login', function (req, res, next) {
    res.render('login');
})

 //USER LISTING ROUTE
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//SIGNUP GET ROUTE
router.get('/signup', function (req, res, next) {
    res.render('signup');
});

//SIGNUP POST ROUTE
router.post('/signup', function (req, res, next) {
    console.log('Checking Account Creation Requirements....')
    models.emp
        .findOrCreate({
            where: { userId: req.body.userId },
            defaults: {
                hireDate: req.body.hireDate,
                dob: req.body.dob,
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                userId: req.body.userId,
                password: authService.hashPassword(req.body.password),
                active: req.body.active
            }
        })
        .spread(function (result, created) {
            if (created) {
                console.log('User Successfully Created!');
                res.redirect('/users/login');
            } else {
                res.send('User Name Does Not Meet The Requirements!');
            }
        });
});

//ADMIN GET ROUTE
router.get('/admin', function (req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
      authService.verifyUser(token)
        .then(user => {
          if (user.admin) {
            models.users.findAll({
              where: {
                Deleted: false
              }
            }).then(usersFound => {
              if (usersFound) {
                console.log('FOUND USERS TO LIST....');
                res.render('admin', {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  email: user.email,
                  list: usersFound,
                })
              } else {
                res.send('Something Went Wrong!');
              }
            })
          } else {
            res.redirect('profile');
          }
        });
    } else {
      res.status(401);
      res.send('Must be logged in');
    }
  
  });

//LOGOUT GET ROUTE
router.get('/logout', function (req, res, next) {
    console.log('Logging User Out....');
    res.cookie('jwt', '', { expires: new Date(0) });
    console.log('User is Now Logged Out....');
    res.redirect('/users/login');
});

module.exports = router;
