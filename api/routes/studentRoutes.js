const express = require('express');
const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

router.post('/', createStudent); // Criar Aluno
router.get('/', getStudents); // Obter todos os alunos
router.get('/:id', getStudentById); //Obter aluno por id específico
router.put('/:id', updateStudent); //Atualizar aluo por id específico
router.delete('/:id', deleteStudent); //deletar aluno por id específico

module.exports = router;
