const { DataTypes } = require('sequelize');
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  seller_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  total_price: {
    allowNull: false,
    type: DataTypes.DECIMAL(9,2),
  },
  delivery_address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  delivery_number: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  sale_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
  }
};
module.exports = (sequelize) => {
  const Sale = sequelize.define('sale',
    attributes,
    {
      timestamps: false,
      tableName: 'sales',
    });

  Sale.associate = (models) => {
    Sale.belongsTo(models.user, {
      as: 'user',
      foreignKey: 'id'
    })
  }
  return Sale;
};