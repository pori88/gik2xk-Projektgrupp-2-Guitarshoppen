module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
    }, {
        underscored: true
    });
    User.associate = (models) => {
        User.hasMany(models.cart, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });

        User.hasMany(models.rating, {
            foreignKey: {
                name: 'user_id',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };
    return User;
};