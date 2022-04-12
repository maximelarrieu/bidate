'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaterBets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DaterBets.belongsTo(models.User, {foreignKey: 'user_id', as: 'userb'})
      DaterBets.belongsTo(models.Date, {foreignKey: 'date_id', as: 'dateb'})
    }
  }
  DaterBets.init({
    user_id: DataTypes.INTEGER,
    date_id: DataTypes.INTEGER,
    amount_0: DataTypes.FLOAT,
    amount_1: DataTypes.FLOAT,
    amount_2: DataTypes.FLOAT,
    amount_3: DataTypes.FLOAT,
    amount_4: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'DaterBets',
  });
  return DaterBets;
};