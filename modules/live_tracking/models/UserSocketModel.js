const Sequelize = require('sequelize');
let sequelize = require('../dao/pg-connector');

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
        createdAt: Sequelize.TIME,
        updatedAt: Sequelize.TIME
    },
    {
        sequelize,
        modelName: 'UserSocket',
        tableName: 'user_sockets'
    });

module.exports = UserSocket;