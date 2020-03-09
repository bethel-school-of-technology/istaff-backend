module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comp', {
      idcomp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncorument: true
      },
      compName: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    }, {
      tableName: 'comp'
    });
  };