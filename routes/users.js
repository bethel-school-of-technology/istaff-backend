var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

//USER LOGIN POST ROUTE
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


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/signup', function (req, res, next) {
    res.render('signup');
});

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

router.get('/login', function (req, res, next) {
    res.render('login');
})

router.post('/login', function (req, res, next) {
});

router.get('/admin', function (req, res, next) {
});

router.get('/logout', function (req, res, next) {
    console.log('Logging User Out....');
    // (tokens have not been added) res.cookie('jwt', '', { expires: new Date(0) });
    console.log('User is Now Logged Out....');
    res.redirect('/users/login');
});

module.exports = router;
