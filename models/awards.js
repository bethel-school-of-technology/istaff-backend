/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('awards', {
    idawards: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    award_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    award_description: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    award_details: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'awards'
  });
};
