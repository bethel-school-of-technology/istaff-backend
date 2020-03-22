/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedules', {
    idschedules: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    idemp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      model: "emp",
      foreignKey: "idemp"
    },
    week_start: {
      type: DataTypes.DATE,
      allowNull: false
      
    },
    mon_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    mon_end: {
      type: DataTypes.TIME,
      allowNull: true
    },
    tue_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    tue_end: {
      type: DataTypes.TIME,
      allowNull: true
    },
    wen_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    wen_end: {
      type: DataTypes.TIME,
      allowNull: true
    },
    thu_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    thu_end: {
      type: DataTypes.TIME,
      allowNull: true
    },
    fri_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    fri_end: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sat_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sat_end: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sun_start: {
      type: DataTypes.TIME,
      allowNull: true
    },
    sun_end: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'schedules'
  });
};
