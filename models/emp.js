/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emp', {
    idemp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
  },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    punch: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'emp'
  });
};
