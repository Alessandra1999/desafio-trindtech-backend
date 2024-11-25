const express = require('express');
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require('../controllers/courseController');

const router = express.Router();

router.post('/', createCourse); // Criar curso
router.get('/', getCourses); // Obter todos os cursos
router.get('/:id', getCourseById); // Obter curso por id específico
router.put('/:id', updateCourse); // Atualizar curso por id específico
router.delete('/:id', deleteCourse); // Deletar curso por id específico

module.exports = router;
