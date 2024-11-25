const express = require('express');
const {
    createStudentCourse,
    getStudentCourses,
    getStudentCourseById,
    updateStudentCourse,
    deleteStudentCourse,
} = require('../controllers/studentCourseController');

const router = express.Router();

router.post('/', createStudentCourse); // Criar associação entre aluno e curso
router.get('/', getStudentCourses); // Obter todas as associações entre aluno e curso
router.get('/:id_student/:id_course', getStudentCourseById); // Obter associação entre aluno e curso por id específico
router.put('/:id_student/:id_course', updateStudentCourse); // Atualizar associação entre aluno e curso por id específico
router.delete('/:id_student/:id_course', deleteStudentCourse); // Deletar associação entre aluno e curso por id específico

module.exports = router;
