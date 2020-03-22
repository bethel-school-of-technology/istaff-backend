const jwt = require('jsonwebtoken');
const models = require('../models');
const bcrypt = require('bcryptjs');

var authService = {
    signUser: function(userId){
        console.log('Baking Cookies!!!')
        const token = jwt.sign({
            Idemp: userId.idemp,
            UserId: userId.userId,
            Admin: userId.admin,
            Manager: userId.manager

        }, 'thesaltpassword',
        {
            expiresIn: '1h'
        });
        console.log('Created Token')
        return token;
    },
    verifyUser: function(token){
        try {
            let decoded = jwt.verify(token, 'thesaltpassword');
            console.log(decoded)
            return models.emp./*findByPk*/findOne(decoded.userId);
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    hashPassword: function(plainTextPassword){
        let salt = bcrypt.genSaltSync(2);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },
    comparePassword: function(plainTextPassword, hashedPassword) {
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
      }
};

module.exports = authService;