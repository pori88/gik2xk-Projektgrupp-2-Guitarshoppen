module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {

        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        model_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    Product.associate = (models) => {

        Product.belongsTo(models.model, {
            foreignKey: 'model_id'
        });

        Product.hasMany(models.product_image, {
            foreignKey: 'product_id',
            onDelete: 'CASCADE'
        });

        Product.hasMany(models.cart_item, {
            foreignKey: 'product_id',
            onDelete: 'CASCADE'
        });

        Product.hasMany(models.rating, {
            foreignKey: 'product_id',
            onDelete: 'CASCADE'
        });
    };
    return Product;
};