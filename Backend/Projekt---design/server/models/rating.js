module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('rating', {
        rating_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        underscored: true,
        timestamps: true
    });
    Rating.associate = (models) => {
        Rating.belongsTo(models.product, {
            foreignKey: 'product_id'
        });

        Rating.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    };
    return Rating;
};