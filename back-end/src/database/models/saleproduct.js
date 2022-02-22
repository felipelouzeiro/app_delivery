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
      tableName: 'salesproducts',
    });

  SaleProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      as: 'sales',
      foreignKey: 'product_id',
      through: SaleProduct,
      otherKey: 'sale_id',
    })

    models.sale.belongsToMany(models.product, {
      as: 'products',
      foreignKey: 'sale_id',
      through: SaleProduct,
      otherKey: 'product_id',
    })
  }
  return SaleProduct;
};