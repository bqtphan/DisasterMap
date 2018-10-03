module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: DataTypes.STRING,
            validate: {
				notEmpty: true
			}
        },
        phoneNumber: {
            type: DataTypes.STRING,
			validate: {
				notEmpty: true
			}
        },
        email: {
            type: DataTypes.STRING,
			validate: {
				isEmail: {
					msg: 'Not Valid Email'
				}
			}
        },
        password: {
            type: DataTypes.STRING,
			allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    User.associate = (models) => {
        User.hasMany(models.MapMessage, {
            onDelete: "cascade"
        });
    }

    return User;
}