const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Student = require("./student");
const Course = require("./course");

const StudentCourse = sequelize.define(
  "StudentCourse",
  {
    conclusion_date: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true, // Desativa a pluralização do nome da tabela
    timestamps: false, // Desativa a criação automática das colunas createdAt e updatedAt
    tableName: "student_course", // Garante que o nome da tabela será 'student_course'
  }
);

// Definindo associações
Student.belongsToMany(Course, {
  through: StudentCourse,
});
Course.belongsToMany(Student, {
  through: StudentCourse,
});

module.exports = StudentCourse;
