'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(5)
      },
      name: {
        type: Sequelize.STRING(30)
      },
      price: {
        type: Sequelize.BIGINT(12)
      },
      description: {
        type: Sequelize.TEXT
      },
      images: {
        type: Sequelize.STRING(60)
      },
      size: {
        type: Sequelize.STRING(30)
      },
      stock: {
        type: Sequelize.INTEGER(5)
      },
      type_id: {
        type: Sequelize.INTEGER(5)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};