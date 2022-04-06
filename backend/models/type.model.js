'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type.hasMany(models.User, {foreignKey: 'type_id', as: 'type'});
    }
  };
  Type.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};