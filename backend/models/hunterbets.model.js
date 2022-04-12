'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HunterBets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HunterBets.belongsTo(models.Date, {foreignKey: 'date_id', as: 'dateh'})
      HunterBets.belongsTo(models.User, {foreignKey: 'dater_id', as: 'daterh'})
      HunterBets.belongsTo(models.User, {foreignKey: 'user_id', as: 'userh'})
    }
  }
  HunterBets.init({
    user_id: DataTypes.INTEGER,
    date_id: DataTypes.INTEGER,
    dater_id: DataTypes.INTEGER,
    amount_0: DataTypes.FLOAT,
    amount_1: DataTypes.FLOAT,
    amount_2: DataTypes.FLOAT,
    amount_3: DataTypes.FLOAT,
    amount_4: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'HunterBets',
  });
  return HunterBets;
};