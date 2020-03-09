'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "comp", deps: []
 *
 **/

var info = {
    "revision": 3,
    "name": "added_comp_table",
    "created": "2020-03-09T01:31:58.941Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "comp",
        {
            "idcomp": {
                "type": Sequelize.INTEGER,
                "field": "idcomp",
                "autoIncorument": true,
                "primaryKey": true,
                "allowNull": false
            },
            "compName": {
                "type": Sequelize.STRING(45),
                "field": "compName",
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
}];

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
