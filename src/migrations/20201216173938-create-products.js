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
      is_dine_in: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_home_delivery: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_pick_up: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      start_delivery: {
      type: Sequelize.DATE
    },
      end_delivery: {
      type: Sequelize.DATE
    },
      category_id: {
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