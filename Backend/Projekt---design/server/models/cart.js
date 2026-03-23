module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        cart_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: 'active'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        underscored: true
    });
    Cart.associate = (models) => {
        Cart.belongsTo(models.user, {
            foreignKey: 'user_id'
        });

        Cart.hasMany(models.cart_item, {
            foreignKey: 'cart_id',
            onDelete: 'CASCADE'
        });
    };
    return Cart;
};