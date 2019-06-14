const Sequelize = require('sequelize');
let sequelize = require('../connectors/seq-pg-connector');

class UserLocation extends Sequelize.Model {}
UserLocation.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        user_id: Sequelize.INTEGER,
        latitude: Sequelize.DOUBLE,
        longitude: Sequelize.DOUBLE,
        is_driving: Sequelize.BOOLEAN,
        createdAt: Sequelize.TIME,
        updatedAt: Sequelize.TIME
    },
    {
        sequelize,
        modelName: 'UserLocation',
        tableName: 'user_locations'
    });

module.exports = UserLocation;