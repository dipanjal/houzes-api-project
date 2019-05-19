const Sequelize = require('sequelize');
let sequelize = require('../connectors/seq-pg-connector');

class VerificationCode extends Sequelize.Model {}
VerificationCode.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        code: Sequelize.TEXT,
        user_email: Sequelize.TEXT,
        expired_at: Sequelize.TIME,
        is_used: Sequelize.BOOLEAN,
        verification_type: Sequelize.TEXT,
        createdAt: Sequelize.TIME,
        updatedAt: Sequelize.TIME
    },
    {
        sequelize,
        modelName: 'VerificationCode',
        tableName: 'verification_codes'
    });

module.exports = VerificationCode;