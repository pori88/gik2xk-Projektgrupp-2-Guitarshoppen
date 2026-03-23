module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('brand', {
        brand_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        underscored: true
    });
    Brand.associate = (models) => {
        Brand.hasMany(models.model, {
            foreignKey: 'brand_id',
            onDelete: 'CASCADE'
        });
    };
    return Brand;
};