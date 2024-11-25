const Course = require('../models/course');

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Rotas para CRUD de Cursos
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do curso
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Erro de validação ou dados ausentes
 */
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retorna todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Erro no servidor ao obter os cursos
 */
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Retorna um curso específico pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Curso encontrado e retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro no servidor ao obter o curso
 */
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Atualiza um curso específico pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               name:
 *                 type: string
 *                 description: Nome atualizado do curso
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Erro de validação ou dados ausentes
 *       404:
 *         description: Curso não encontrado
 */
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        await course.update(req.body);
        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Deleta um curso específico pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       204:
 *         description: Curso deletado com sucesso
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro no servidor ao deletar o curso
 */
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Curso não encontrado' });
        }
        await course.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
