'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.category.hasOne(models.products, {
        foreignKey: 'category_id'
      })
    }
  };
  category.init({
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};