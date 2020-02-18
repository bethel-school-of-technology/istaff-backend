/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disciplinary', {
    iddisciplinary: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idemp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      model: "emp",
      foreignKey: "idemp"
    },
    write_up_description: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    write_up_details: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'disciplinary'
  });
};
