const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Student = sequelize.define('Student', {
    id_student: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    student_lastname: {
        type: DataTypes.STRING,
    },
    student_birthdate: {
        type: DataTypes.DATE,
    },
    student_cpf: {
        type: DataTypes.STRING(14),
        unique: true,
    },
    student_gender: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Não Binário', 'Outros', 'Prefiro Não Responder'),
    },
    student_email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    student_register_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'students' // Garante que o nome da tabela será 'students'
});

module.exports = Student;
