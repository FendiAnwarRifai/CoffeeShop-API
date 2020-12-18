'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.products.hasOne(models.delivery, {
        foreignKey: 'id_product'
      })
    }
  };
  products.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    description: DataTypes.TEXT,
    images: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    size: DataTypes.STRING,
    type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};