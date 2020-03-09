'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "email" to table "emp"
 * addColumn "idcomp" to table "emp"
 *
 **/

var info = {
    "revision": 2,
    "name": "added_idcomp_and_email",
    "created": "2020-03-09T01:28:06.271Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "emp",
            "email",
            {
                "type": Sequelize.STRING,
                "field": "email",
                "defaultValue": false,
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "emp",
            "idcomp",
            {
                "type": Sequelize.INTEGER,
                "field": "idcomp",
                "allowNull": false
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
