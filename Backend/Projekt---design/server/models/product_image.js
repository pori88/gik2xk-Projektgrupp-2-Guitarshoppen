module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('product_image', {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        alt_text: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sort_order: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        underscored: true
    });
    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.product, {
            foreignKey: 'product_id'
        });
    };
    return ProductImage;
};