const StudentCourse = require("../models/studentCourse");

/**
 * @swagger
 * tags:
 *   name: Associação Aluno-Curso
 *   description: Rotas para CRUD de Associação Aluno-Curso
 */

/**
 * @swagger
 * /student-course:
 *   post:
 *     summary: Cria uma nova associação entre aluno e curso
 *     tags: [Associação Aluno-Curso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_student:
 *                 type: integer
 *                 description: ID do aluno
 *               id_course:
 *                 type: integer
 *                 description: ID do curso
 *             required:
 *               - id_student
 *               - id_course
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentCourse'
 *       400:
 *         description: Erro de validação ou dados ausentes
 */
exports.createStudentCourse = async (req, res) => {
  try {
    // Validação simples dos dados recebidos
    const { id_student, id_course } = req.body;
    if (!id_student || !id_course) {
      return res
        .status(400)
        .json({ error: "Os campos id_aluno e id_curso são obrigatórios." });
    }

    // Criar a associação
    const studentCourse = await StudentCourse.create(req.body);
    res.status(201).json(studentCourse);
  } catch (error) {
    console.error("Erro ao criar associação:", error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /student-course:
 *   get:
 *     summary: Retorna todas as associações de alunos e cursos
 *     tags: [Associação Aluno-Curso]
 *     responses:
 *       200:
 *         description: Lista de associações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentCourse'
 *       500:
 *         description: Erro no servidor ao obter associações
 */
exports.getStudentCourses = async (req, res) => {
  try {
    const studentCourses = await StudentCourse.findAll();
    res.json(studentCourses);
  } catch (error) {
    console.error("Erro ao obter associações:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /student-course/{id_student}/{id_course}:
 *   get:
 *     summary: Retorna uma associação específica pelo ID do aluno e do curso
 *     tags: [Associação Aluno-Curso]
 *     parameters:
 *       - in: path
 *         name: id_student
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *       - in: path
 *         name: id_course
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Associação encontrada e retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentCourse'
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro no servidor ao obter associação
 */
exports.getStudentCourseById = async (req, res) => {
  const { id_student, id_course } = req.params;
  try {
    const studentCourse = await StudentCourse.findOne({
      where: {
        StudentIdStudent: id_student,
        CourseIdCourse: id_course,
      },
    });
    if (!studentCourse) {
      return res.status(404).json({ error: "Associação não encontrada." });
    }
    res.json(studentCourse);
  } catch (error) {
    console.error("Erro ao obter associação:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /student-course/{id_student}/{id_course}:
 *   put:
 *     summary: Atualiza uma associação específica pelo ID do aluno e do curso
 *     tags: [Associação Aluno-Curso]
 *     parameters:
 *       - in: path
 *         name: id_student
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *       - in: path
 *         name: id_course
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_student:
 *                 type: integer
 *                 description: Novo ID do aluno
 *               id_course:
 *                 type: integer
 *                 description: Novo ID do curso
 *             required:
 *               - id_student
 *               - id_course
 *     responses:
 *       200:
 *         description: Associação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentCourse'
 *       400:
 *         description: Erro de validação ou dados ausentes
 *       404:
 *         description: Associação não encontrada
 */
exports.updateStudentCourse = async (req, res) => {
  const { id_student, id_course } = req.params;
  try {
    const studentCourse = await StudentCourse.findOne({
      where: {
        StudentIdStudent: id_student,
        CourseIdCourse: id_course,
      },
    });
    if (!studentCourse) {
      return res.status(404).json({ error: "Associação não encontrada." });
    }

    // Validação dos dados para atualização
    const { id_student: newIdStudent, id_course: newIdCourse } = req.body;
    if (newIdStudent === undefined || newIdCourse === undefined) {
      return res.status(400).json({
        error:
          "Os campos id_aluno e id_curso são obrigatórios para atualização.",
      });
    }

    await studentCourse.update(req.body);
    res.json(studentCourse);
  } catch (error) {
    console.error("Erro ao atualizar associação:", error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /student-course/{id_student}/{id_course}:
 *   delete:
 *     summary: Deleta uma associação específica pelo ID do aluno e do curso
 *     tags: [Associação Aluno-Curso]
 *     parameters:
 *       - in: path
 *         name: id_student
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *       - in: path
 *         name: id_course
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       204:
 *         description: Associação deletada com sucesso
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro no servidor ao deletar associação
 */
exports.deleteStudentCourse = async (req, res) => {
  const { id_student, id_course } = req.params;
  try {
    const studentCourse = await StudentCourse.findOne({
      where: {
        StudentIdStudent: id_student,
        CourseIdCourse: id_course,
      },
    });
    if (!studentCourse) {
      return res.status(404).json({ error: "Associação não encontrada." });
    }
    await studentCourse.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar associação:", error.message);
    res.status(500).json({ error: error.message });
  }
};
