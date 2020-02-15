/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const punch = sequelize.define('time_punch', {
    idtime_punch: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idemp: {
      type: DataTypes.INTEGER(11),
      model: "emp",
      foreignKey: "idemp",
    },
    clock_in: {
      type: DataTypes.DATE,
      allowNull: true
    },
    clock_out: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {});
  punch.associate = function(models) {
    // associations can be defined here
  }
  return punch;
};
