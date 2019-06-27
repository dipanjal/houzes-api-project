const Sequelize = require('sequelize');
let sequelize = require('../dao/PG-DBConnector');

/**
 * SEPARATE USER SOCKET SCHEMA FOR SOCKET PROJECT
 * USED FOR SAVING USER'S SOCKET ID on SOCKET CONNECT
 */

class UserSocket extends Sequelize.Model {}
UserSocket.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        user_id: Sequelize.INTEGER,
        socket_id: Sequelize.TEXT,
        is_connected: Sequelize.BOOLEAN,
        createdAt: Sequelize.TIME,
        updatedAt: Sequelize.TIME
    },
    {
        sequelize,
        modelName: 'UserSocket',
        tableName: 'user_sockets'
    });

module.exports = UserSocket;