const Sequelize = require('sequelize');
let sequelize = require('../connectors/seq-pg-connector');

class UserVerification extends Sequelize.Model {}
UserVerification.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        code: Sequelize.TEXT,
        user_id: Sequelize.INTEGER,
        expires_at: Sequelize.TIME,
        is_used: Sequelize.BOOLEAN,
        verification_type: Sequelize.TEXT,
        createdAt: Sequelize.TIME,
        updatedAt: Sequelize.TIME
    },
    {
        sequelize,
        modelName: 'UserVerification',
        tableName: 'user_verifications'
    });

module.exports = UserVerification;