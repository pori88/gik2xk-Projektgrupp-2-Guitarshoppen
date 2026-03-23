module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('model', {
        model_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    }, {
        underscored: true
    });
    Model.associate = (models) => {
        Model.belongsTo(models.brand, {
            foreignKey: 'brand_id'
        });

        Model.belongsTo(models.guitar_type, {
            foreignKey: 'type_id'
        });

        Model.hasMany(models.product, {
            foreignKey: 'model_id',
            onDelete: 'CASCADE'
        });
    };
    return Model;
};