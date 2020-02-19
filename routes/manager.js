var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


//USER LOGIN POST ROUTE ----- DONE
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

// USER LOGIN ROUTE
router.get('/login', function (req, res, next) {
    res.render('login');
})