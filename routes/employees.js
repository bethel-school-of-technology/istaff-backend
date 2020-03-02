var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');


//
router.post('/login', function (req, res, next) {
    models.users.findOne({
        where: { Username: req.body.Username }
    })
        .then(user => {
            if (!user) {
                console.log('Invalid Login Attempt!')
                res.render('badlogin');
                return
            } 
            else {
                let passwordMatch = authService
                    // CHECK IF THE PASSWORD MATCHES
                    .comparePassword(req.body.Password, user.Password);
                if (passwordMatch) {
                    let token = authService.signUser(user);
                    res.cookie('jwt', token);
                    } else {
                        // IF USER ADMIN DIRECT TO ADMIN PAGE
                        if (user.Admin) {
                            console.log('REDIRECTING TO ADMIN PAGE....');
                            res.redirect('admin');

                        } else {
                            // IF USER NOT ADMIN, direct to emp page 
                            res.redirect('emp');
                        }
                    }
               
            }
        })
});

// USER LOGIN ROUTE
router.get('/login', function (req, res, next) {
    res.render('login');
})
