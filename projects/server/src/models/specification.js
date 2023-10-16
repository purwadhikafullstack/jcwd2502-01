'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  specification.init({
    height: DataTypes.STRING,
    width: DataTypes.STRING,
    thickness: DataTypes.STRING,
    weight: DataTypes.STRING,
    wireless: DataTypes.BOOLEAN,
    wired: DataTypes.STRING,
    battery_life: DataTypes.STRING,
    warranty: DataTypes.STRING,
    sensor: DataTypes.STRING,
    resolution: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'specification',
  });
  return specification;
};