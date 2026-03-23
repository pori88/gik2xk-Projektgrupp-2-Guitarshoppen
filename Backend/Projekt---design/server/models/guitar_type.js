module.exports = (sequelize, DataTypes) => {
    const GuitarType = sequelize.define('guitar_type', {
        type_id: {
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
    GuitarType.associate = (models) => {
        GuitarType.hasMany(models.model, {
            foreignKey: 'type_id',
            onDelete: 'CASCADE'
        });
    };
    return GuitarType;
};