'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "awards", deps: []
 * createTable "disciplinary", deps: []
 * createTable "emp", deps: []
 * createTable "schedules", deps: []
 * createTable "time_punches", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial",
    "created": "2020-02-19T05:45:40.169Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "awards",
            {
                "idawards": {
                    "type": Sequelize.INTEGER(11),
                    "field": "idawards",
                    "primaryKey": true,
                    "allowNull": false
                },
                "award_name": {
                    "type": Sequelize.STRING(45),
                    "field": "award_name",
                    "allowNull": false
                },
                "award_description": {
                    "type": Sequelize.STRING(45),
                    "field": "award_description",
                    "allowNull": false
                },
                "award_details": {
                    "type": Sequelize.STRING(255),
                    "field": "award_details",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "disciplinary",
            {
                "iddisciplinary": {
                    "type": Sequelize.INTEGER(11),
                    "field": "iddisciplinary",
                    "primaryKey": true,
                    "allowNull": false
                },
                "idemp": {
                    "type": Sequelize.INTEGER,
                    "field": "idemp",
                    "foreignKey": "idemp",
                    "model": "emp",
                    "allowNull": false
                },
                "write_up_description": {
                    "type": Sequelize.STRING(45),
                    "field": "write_up_description",
                    "allowNull": false
                },
                "write_up_details": {
                    "type": Sequelize.STRING(255),
                    "field": "write_up_details",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "emp",
            {
                "idemp": {
                    "type": Sequelize.INTEGER,
                    "field": "idemp",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "hireDate": {
                    "type": Sequelize.DATEONLY,
                    "field": "hireDate",
                    "allowNull": false
                },
                "dob": {
                    "type": Sequelize.DATEONLY,
                    "field": "dob",
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING(45),
                    "field": "firstName",
                    "allowNull": false
                },
                "middleName": {
                    "type": Sequelize.STRING(45),
                    "field": "middleName",
                    "allowNull": true
                },
                "lastName": {
                    "type": Sequelize.STRING(45),
                    "field": "lastName",
                    "allowNull": false
                },
                "userId": {
                    "type": Sequelize.STRING(45),
                    "field": "userId",
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "active": {
                    "type": Sequelize.INTEGER(4),
                    "field": "active",
                    "defaultValue": "1",
                    "allowNull": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false,
                    "allowNull": false
                },
                "admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "admin",
                    "defaultValue": false,
                    "allowNull": false
                },
                "punch": {
                    "type": Sequelize.BOOLEAN,
                    "field": "punch",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "schedules",
            {
                "idschedules": {
                    "type": Sequelize.INTEGER(11),
                    "field": "idschedules",
                    "primaryKey": true,
                    "allowNull": false
                },
                "idemp": {
                    "type": Sequelize.INTEGER,
                    "field": "idemp",
                    "foreignKey": "idemp",
                    "model": "emp",
                    "allowNull": false
                },
                "week_start": {
                    "type": Sequelize.DATE,
                    "field": "week_start",
                    "allowNull": false
                },
                "mon_start": {
                    "type": Sequelize.DATE,
                    "field": "mon_start",
                    "allowNull": true
                },
                "mon_end": {
                    "type": Sequelize.DATE,
                    "field": "mon_end",
                    "allowNull": true
                },
                "tue_start": {
                    "type": Sequelize.DATE,
                    "field": "tue_start",
                    "allowNull": true
                },
                "tue_end": {
                    "type": Sequelize.DATE,
                    "field": "tue_end",
                    "allowNull": true
                },
                "wen_start": {
                    "type": Sequelize.DATE,
                    "field": "wen_start",
                    "allowNull": true
                },
                "wen_end": {
                    "type": Sequelize.DATE,
                    "field": "wen_end",
                    "allowNull": true
                },
                "thu_start": {
                    "type": Sequelize.DATE,
                    "field": "thu_start",
                    "allowNull": true
                },
                "thu_end": {
                    "type": Sequelize.DATE,
                    "field": "thu_end",
                    "allowNull": true
                },
                "fri_start": {
                    "type": Sequelize.DATE,
                    "field": "fri_start",
                    "allowNull": true
                },
                "fri_end": {
                    "type": Sequelize.DATE,
                    "field": "fri_end",
                    "allowNull": true
                },
                "sat_start": {
                    "type": Sequelize.DATE,
                    "field": "sat_start",
                    "allowNull": true
                },
                "sat_end": {
                    "type": Sequelize.DATE,
                    "field": "sat_end",
                    "allowNull": true
                },
                "sun_start": {
                    "type": Sequelize.DATE,
                    "field": "sun_start",
                    "allowNull": true
                },
                "sun_end": {
                    "type": Sequelize.DATE,
                    "field": "sun_end",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "time_punches",
            {
                "idtime_punch": {
                    "type": Sequelize.INTEGER(11),
                    "field": "idtime_punch",
                    "primaryKey": true,
                    "allowNull": false
                },
                "idemp": {
                    "type": Sequelize.INTEGER,
                    "field": "idemp",
                    "foreignKey": "idemp",
                    "model": "emp"
                },
                "clock_in": {
                    "type": Sequelize.DATE,
                    "field": "clock_in",
                    "allowNull": true
                },
                "clock_out": {
                    "type": Sequelize.DATE,
                    "field": "clock_out",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
