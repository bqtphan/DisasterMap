module.exports = (sequelize, DataTypes) => {
    const MapMessage = sequelize.define('MapMessage', {
        message: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        location: {
            type: DataTypes.STRING,
            validate: {
				notEmpty: true
			}
        }
    });

    MapMessage.associate = (models) => {
        MapMessage.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });  
    };


    return MapMessage;
}