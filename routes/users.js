var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

//LOGIN POST ROUTE
router.post('/login', function (req, res, next) {
    console.log('Looking for user...'),
        console.log('Received ')
    models.emp.findOne({
        where: { userId: req.body.userId }
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
                console.log(userId.userId)
                let token = authService.signUser(userId);
                res.cookie('jwt', token);
                // IS THE USERS ACCOUNT SET TO DELETED?
                console.log('Browser is a good boy, gave a cookie!')
                if (!userId.active) {
                    res.cookie('jwt', '', { expires: new Date(0) });
                    console.log('Account has been deleted...'),
                        console.log('Deleted Assigned Cookie and Logged User back out!');
                    res.send({})
                } else {
                    // IF USER ADMIN DIRECT TO ADMIN PAGE
                    if (userId.admin) {
                        console.log('REDIRECTING TO ADMIN PAGE....');
                        res.json({
                            logged_in_admin: true,
                            emp: userId,
                            //punch: punch,
                            jwt: token,
                            idemp: userId,
                            userId: userId
                        })
                        console.log('Logged in as Admin!');
                    } else if (userId.manager) {
                        res.json({
                            logged_in_manager: true,
                            emp: userId,
                            //punch: punch,
                            jwt: token,
                            //idemp: idemp
                            userId: userId
                        })
                        console.log('Logged in as User');
                        console.log('REDIRECTIONG TO MANAGER PAGE....');
                    } else {

                        models.schedules.findAll({
                            // where: { idemp: userId.idemp },
                            // order: [['createdAt', 'DESC']],
                        }).then(idemp => {

                            models.time_punch.findOrCreate({
                                where: { idemp: userId.idemp },
                                order: [['createdAt', 'DESC']],
                            }).then(idtime_punch => {
                                res.json({
                                    time_punch: idtime_punch,
                                    logged_in: true,
                                    emp: userId,
                                    jwt: token,
                                    idemp: idemp,
                                    userId: userId
                                })
                                //console.log(idtime_punch.idtime_punch);
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
router.post('/', function (req, res, next) {
    if (req.body.jwt) {
        console.log('Checking Account Creation Requirements....')
        let token = req.body.jwt;
        console.log('Created Variable - token!')
        if (token) {
            console.log('Received Token!')
            authService.verifyUser(token).then(userId => {
                console.log('Auth Service Check Complete')
                if (userId.admin || userId.manager) {
                    console.log(req.body.idcomp)
                    models.emp
                        .findAll({
                            where: { idcomp: req.body.idcomp }
                        })
                        .then(employeesFound => {
                            //console.log(employeesFound);
                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify(employeesFound));
                        });
                } else {
                    res.send('You are not logged in or a manager!')
                }
            })
        } else {
            console.log('testing')
        }
    } else {
        console.log('Access Denied!')
        res.send('Access Denied')
    }
});

//EMPLOYEE DELETE ROUTE
router.delete("/:idemp", function (req, res, next) {
    if (req.body.jwt) {

        console.log('Checking Account Creation Requirements....')
        let token = req.body.jwt;
        console.log('Created Variable - token!')
        if (token) {
            console.log('Received Token!')
            authService.verifyUser(token).then(userId => {
                console.log('Auth Service Check Complete')
                if (userId.admin || userId.manager) {
                    let employeeId = parseInt(req.params.idemp);
                    console.log(employeeId)
                    models.emp
                        .destroy({
                            where: { idemp: employeeId }
                        })
                        .then(result => res.status(200).send('User deleted!'))
                        .catch(err => {
                            res.status(400);
                            res.send("There was a problem deleting the employee. Please make sure you are specifying the correct employee ID.");
                        }
                        );
                } else {
                    res.send('You are not logged in or a manager!')
                }
            })

        } else {
            console.log('testing')
        }
    } else {
        console.log('Access Denied!')
        res.send('Access Denied')
    }
});

//SIGNUP POST ROUTE
router.post('/signup', function (req, res, next) {
    if (req.body.jwt) {

        console.log('Checking Account Creation Requirements....')
        let token = req.body.jwt;
        console.log('Created Variable - token!')
        if (token) {
            console.log('Received Token!')
            authService.verifyUser(token).then(userId => {
                console.log('Auth Service Check Complete')
                if (userId.admin || userId.manager) {
                    console.log('Creating User')
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
                        }).spread(function (result, created) {
                            if (created) {
                                res.send('User Successfully Created!');
                                console.log('User Successfully Created!');
                            } else {
                                res.send('User Name Does Not Meet The Requirements!');
                            }
                        });
                } else {
                    res.send('You are not logged in or a manager!')
                }
            })

        } else {
            console.log('testing')
        }
    } else {
        console.log('Access Denied!')
        res.send('Access Denied')
    }
});

//UPDATE ACCOUNT POST ROUTE
router.post('/updateAccount', function (req, res, next) {
    if (req.body.jwt) {

        console.log('Checking Account Creation Requirements....')
        let token = req.body.jwt;
        console.log('Created Variable - token!')
        if (token) {
            console.log('Received Token!')
            authService.verifyUser(token).then(userId => {
                console.log('Auth Service Check Complete')
                if (userId.admin || userId.manager) {
                    console.log('Updating User')
                    console.log(req.body.idemp)
                    models.emp
                        .update({
                            idemp: req.body.idemp,
                            userId: req.body.userId,
                            hireDate: req.body.hireDate,
                            dob: req.body.dob,
                            firstName: req.body.firstName,
                            middleName: req.body.middleName,
                            lastName: req.body.lastName,
                            userId: req.body.userId,
                            password: authService.hashPassword(req.body.password),
                            manager: req.body.manager,
                            email: req.body.email,
                            active: req.body.active
                        }, {
                            where: { idemp: req.body.idemp },
                            defaults: {

                                hireDate: req.body.hireDate,
                                dob: req.body.dob,
                                firstName: req.body.firstName,
                                middleName: req.body.middleName,
                                lastName: req.body.lastName,
                                userId: req.body.userId,
                                password: req.body.password,
                                active: req.body.active,
                                manager: req.body.manager,
                                email: req.body.email,
                                idcomp: req.body.idcomp,
                                active: req.body.active
                            }
                        }).spread(function (result, created) {
                            if (result) {
                                res.send('User Successfully Created!');
                                console.log('User Successfully Updated!');
                            } else {
                                res.send('User Name Does Not Meet The Requirements!');
                            }
                        });
                } else {
                    res.send('You are not logged in or a manager!')
                }
            })

        } else {
            console.log('testing')
        }
    } else {
        console.log('Access Denied!')
        res.send('Access Denied')
    }
});

//LOGOUT GET ROUTE
router.get('/logout', function (req, res, next) {
    console.log('Logging User Out....');
    res.cookie('jwt', '', { expires: new Date(0) });
    console.log('User is Now Logged Out....');
    res.redirect('/users/login');
});

//RETREIVE EMPLOYEE SCHEDULES
router.post('/schedules', function (req, res, next) {

    if (req.body.jwt) {

        console.log('Checking Account Creation Requirements....')
        let token = req.body.jwt;
        console.log('Created Variable - token!')
        if (token) {
            console.log('Received Token!')
            authService.verifyUser(token).then(userId => {
                console.log('Auth Service Check Complete')
                if (userId) {

                    console.log('Getting Schedule')
                    models.schedules.findAll({
                        where: { idemp: req.body.idemp },
                        order: [['createdAt', 'DESC']]

                    }).then(idschedules => {
                        res.json({
                            idschedules: idschedules
                        })
                    })
                } else {
                    res.send('Not a user!');
                }
            })
        } else {
            res.send('Something went wrong!');
        }
    } else {
        res.send('Something went wrong!')
    }
});

//CREATE A SCHEDULE
router.post('/schedule', function (req, res, next) {

    if (req.body.jwt) {

        console.log('Checking Account Creation Requirements....')
        let token = req.body.jwt;
        console.log('Created Variable - token!')
        if (token) {
            console.log('Received Token!')
            authService.verifyUser(token).then(userId => {
                console.log('Auth Service Check Complete')
                if (userId.admin || userId.manager) {
                    console.log('Creating or Find Work Schedules...')
                    console.log(req.body.idemp)
                    console.log(req.body.mon_start)
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
                                res.send('Schedule Created Successfully!');
                                console.log('Schedule Successfully Created!');
                            } else {
                                res.send('Scheudle Does Not Meet The Requirements!');
                            }
                        });
                } else {
                    res.send('Not Admin Or Manager');
                }
            })
        } else {
            res.send('Something went wrong!');
        }
    } else {
        res.send('Something Went Wrong!')
    }

});

//CLOCKING IN / OUT ROUTE
router.post('/punch', function (req, res, next) {
    if (req.body.jwt) {

        console.log('Checking Account Creation Requirements....')
        let token = req.body.jwt;
        console.log('Created Variable - token!')
        if (token) {
            console.log('Received Token!')
            authService.verifyUser(token).then(userId => {
                console.log('Auth Service Check Complete')
                if (userId) {

                    console.log('Clocking In or Out...')
                    models.time_punch
                        .findOne({
                            where: { idtime_punch: req.body.idtime_punch },
                            defaults: {
                                idemp: req.body.idemp,
                                clock_in: req.body.clock_in,
                                clock_out: req.body.clock_out
                            }
                        })
                    console.log('Found Record')
                    console.log('Updating Punch Record...')
                    models.time_punch
                        .update({ clock_in: req.body.clock_in, clock_out: req.body.clock_out },
                            {
                                where: { idtime_punch: req.body.idtime_punch },
                                defaults: {
                                    idemp: req.body.idemp,
                                    clock_in: req.body.clock_in,
                                    clock_out: req.body.clock_out
                                }
                            }).then(idtime_punch => {

                                models.time_punch
                                    .findOne({
                                        where: { idtime_punch: req.body.idtime_punch },
                                        defaults: {
                                            idemp: idtime_punch.idemp
                                        }

                                    }).then(resp => {
                                        console.log(resp.clock_out)
                                        if (resp.clock_out) {
                                            console.log('If Clockout Not Null...')
                                            console.log(resp.idemp)
                                            models.time_punch
                                                .create({
                                                    idemp: resp.idemp

                                                }).then(response => {
                                                    console.log(resp.idemp)
                                                    res.json({
                                                        idtime_punch: response.idtime_punch
                                                    })
                                                })
                                        } else {
                                            res.send('Clocked In!')
                                            console.log('If Clockout Not Updated and still Null...')
                                            //console.log(idtime_punch)
                                        }
                                    })
                            })
                } else {
                    res.send('Not a user!');
                }
            })
        } else {
            res.send('Something went wrong!');
        }
    } else {
        res.send('Something went wrong!')
    }

});

//RESET PASSWORD
router.post("/emps", function (req, res, next) {
    console.log('Resetting Password');
    console.log(req.body)
    models.emp
        .findOne({
            where: { email: req.body.email },
            defaults: {
                password: req.body.password,
                email: req.body.email
            }
        })
    console.log('Found User')
    console.log()
    models.emp
        .update({ password: authService.hashPassword(req.body.password) },
            { where: { email: req.body.email } }, {
            defaults: {
                email: req.body.email,
                password: authService.hashPassword(req.body.password)
            }

        }).then()
    res.send('Password Reset!')
});

module.exports = router;
