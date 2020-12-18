'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  order.init({
    user_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    customer_phone: DataTypes.STRING,
    subtotal: DataTypes.INTEGER,
    tax_fee: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status_order: DataTypes.ENUM('new order', 'paid', 'done'),
    payment_method_id: DataTypes.INTEGER,
    delivery_method: DataTypes.ENUM('home delivery', 'dine in', 'take away')
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};