'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "idemp" on table "disciplinary"
 * changeColumn "idemp" on table "disciplinary"
 * changeColumn "idemp" on table "disciplinary"
 * changeColumn "idemp" on table "schedules"
 * changeColumn "idemp" on table "schedules"
 * changeColumn "idemp" on table "schedules"
 * changeColumn "idemp" on table "time_punches"
 * changeColumn "idemp" on table "time_punches"
 * changeColumn "idemp" on table "time_punches"
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_2",
    "created": "2020-02-19T05:54:14.494Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "disciplinary",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "disciplinary",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "disciplinary",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "schedules",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "schedules",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "schedules",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp",
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "time_punches",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "time_punches",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "time_punches",
            "idemp",
            {
                "type": Sequelize.INTEGER,
                "field": "idemp",
                "foreignKey": "idemp",
                "model": "emp"
            }
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
