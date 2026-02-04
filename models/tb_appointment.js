'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_appointment.init({
    id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_appointment',
  });
  return tb_appointment;
};