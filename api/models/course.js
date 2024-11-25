const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Course = sequelize.define('Course', {
    id_course: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: 'courses' // Garante que o nome da tabela será 'courses'
});

module.exports = Course;
