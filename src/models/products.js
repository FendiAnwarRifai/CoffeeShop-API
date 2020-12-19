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
      models.products.belongsTo(models.category, {
        foreignKey: 'category_id'
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
    is_dine_in: DataTypes.BOOLEAN,
    is_home_delivery: DataTypes.BOOLEAN,
    is_pick_up: DataTypes.BOOLEAN,
    start_delivery: DataTypes.DATE,
    end_delivery: DataTypes.DATE,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};