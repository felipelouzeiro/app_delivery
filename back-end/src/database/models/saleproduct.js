const { DataTypes } = require('sequelize');
const attributes = {
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  }
};
module.exports = (sequelize) => {
  const SaleProduct = sequelize.define('saleProduct',
    attributes,
    {
      timestamps: false,
      underscored: true,
      tableName: 'salesProducts',
    });

  SaleProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      as: 'sales',
      foreignKey: 'productId',
      through: SaleProduct,
      otherKey: 'saleId',
    })

    models.sale.belongsToMany(models.product, {
      as: 'products',
      foreignKey: 'saleId',
      through: SaleProduct,
      otherKey: 'productId',
    })
  }
  return SaleProduct;
};