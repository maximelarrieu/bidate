'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Date, {foreignKey: 'user_id', as: 'user'})
      User.hasMany(models.DaterBets, {foreignKey: 'user_id', as: 'userb'})
      User.hasMany(models.HunterBets, {foreignKey: 'dater_id', as: 'daterh'})
      User.hasMany(models.HunterBets, {foreignKey: 'user_id', as: 'userh'})
      User.belongsTo(models.Type, {foreignKey: 'type_id', as: 'type'})
      User.belongsToMany(models.Role, {through: 'UserRoles', foreignKey: 'userId', as: 'roles' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    type_id: { type: DataTypes.INTEGER },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};