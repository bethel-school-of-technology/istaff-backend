var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

//LOGIN POST ROUTE
router.post('/login', function (req, res, next) {
    console.log('Looking for user...'),
        console.log('Received ')
    models.emp.findOne({
        where: { userId: req.body.userId}
    }).then(userId => {
        if (!userId) {
            console.log('Invalid Login Attempt!')
            //res.render('badlogin');
            return
        } else {
            console.log('Checking Password...')
            let passwordMatch = authService
                // CHECK IF THE PASSWORD MATCHES
                .comparePassword(req.body.password, userId.password);
            console.log('Compared the Auth Passwords...')
            if (passwordMatch) {
                let token = authService.signUser(userId);
                res.cookie('jwt', token);
                // IS THE USERS ACCOUNT SET TO DELETED?
                console.log('Browser is a good boy, gave a cookie!')
                if (userId.deleted) {
                    res.cookie('jwt', '', { expires: new Date(0) });
                    res.render('deleted');
                    console.log('Account has been deleted...'),
                        console.log('Deleted Assigned Cookie and Logged User back out!');
                } else {
                    // IF USER ADMIN DIRECT TO ADMIN PAGE
                    if (userId.admin) {
                        console.log('REDIRECTING TO ADMIN PAGE....');
                        res.json({
                            logged_in_admin: true,
                            emp: emp,
                            jwt: token
                        })
                        console.log('Logged in as Admin!');
                    } else if (userId.manager) {
                        res.json({
                            logged_in_manager: true,
                            emp: userId,
                            jwt: token
                        })
                        console.log('Logged in as User');
                        console.log('REDIRECTIONG TO MANAGER PAGE....');
                    } else { 

                        models.schedules.findAll({
                            where: { idemp: userId.idemp}
                        }).then(idemp => {

                        // IF USER NOT ADMIN OR MANAGER, DIRECT TO PROFILE
                        res.json({
                            logged_in: true,
                            emp: userId,
                            jwt: token,
                            idemp: idemp
                        })
                        })
                        console.log('Logged in as User');
                    }
                };
            } else {
                console.log("Invalid Credentials!");
            };
        };
    });
});

//LOGIN GET ROUTE
router.get('/login', function (req, res, next) {
    res.send(JSON.stringify(
        models.emp
    ));
});

//USER LISTING ROUTE
router.get('/', function (req, res, next) {
    models.emp
    .findAll()
    .then(employeesFound => {
      //console.log(employeesFound);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(employeesFound));
    });
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
                active: req.body.active,
                manager: req.body.manager,
                email: req.body.email,
                idcomp: req.body.idcomp
            }
        })
        .spread(function (result, created) {
            if (created) {
                res.send('User Successfully Created!');
                console.log('User Successfully Created!');
            } else {
                res.send('User Name Does Not Meet The Requirements!');
            }
        });
});

//LOGOUT GET ROUTE
router.get('/logout', function (req, res, next) {
    console.log('Logging User Out....');
    res.cookie('jwt', '', { expires: new Date(0) });
    console.log('User is Now Logged Out....');
    res.redirect('/users/login');
    console.log('Logging User Out....');
    res.cookie('jwt', '', { expires: new Date(0) });
    console.log('User is Now Logged Out....');
    res.redirect('/users/login');
});

router.post('/schedule', function (req, res, next) {

    console.log('Creating or Find Work Schedules...')
    models.schedules
        .findOrCreate({
            where: { idschedules: req.body.idschedules },
            defaults: {
                idemp: req.body.idemp,
                week_start: req.body.week_start,
                mon_start: req.body.mon_start,
                mon_end: req.body.mon_end,
                tue_start: req.body.tue_start,
                tue_end: req.body.tue_end,
                wen_start: req.body.wen_start,
                wen_end: req.body.wen_end,
                thu_start: req.body.thu_start,
                thu_end: req.body.thu_end,
                fri_start: req.body.fri_start,
                fri_end: req.body.fri_end,
                sat_start: req.body.sat_start,
                sat_end: req.body.sat_end,
                sun_start: req.body.sun_start,
                sun_end: req.body.sun_end
            }
        })
        .spread(function (result, created) {
            if (created) {
                console.log('User Successfully Created!');
            } else {
                res.send('User Name Does Not Meet The Requirements!');
            }
        });

});

module.exports = router;
