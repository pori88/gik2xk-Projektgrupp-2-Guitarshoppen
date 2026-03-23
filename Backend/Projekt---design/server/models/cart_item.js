module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('cart_item', {
        cart_item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        underscored: true
    });
    CartItem.associate = (models) => {
        CartItem.belongsTo(models.cart, {
            foreignKey: 'cart_id'
        });

        CartItem.belongsTo(models.product, {
            foreignKey: 'product_id'
        });
    };
    return CartItem;
};