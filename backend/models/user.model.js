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
      User.belongsTo(models.Type, {foreignKey: 'type_id', as: 'type'})
      User.belongsToMany(models.Role, {through: 'UserRoles', foreignKey: 'userId', as: 'roles' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    type_id: { type: DataTypes.INTEGER },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};