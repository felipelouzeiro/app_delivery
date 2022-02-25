module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id',
        type: Sequelize.INTEGER,
      },
      sellerId: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'seller_id',
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        allowNull: false,
        field: 'total_price',
        type: Sequelize.DECIMAL(9,2),
      },
      deliveryAddress: {
        allowNull: false,
        field: 'delivery_address',
        type: Sequelize.STRING,
      },
      deliveryNumber: {
        allowNull: false,
        field: 'delivery_number',
        type: Sequelize.STRING,
      },
      saleDate: {
        allowNull: true,
        field: 'sale_date',
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
      },
      status: {
        allowNull: true,
        defaultValue: 'Pendente',
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};