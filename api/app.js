const express = require('express');
const sequelize = require('./config/config');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentCourseRoutes = require('./routes/studentCourseRoutes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swagger/swagger_output.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors({
    origin: 'https://desafio-trindtech.vercel.app', // Permitir apenas esse domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use(express.json()); // Para permitir o recebimento de JSON no corpo das requisições

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Usa o Swagger UI para exibir a documentação

// Definindo as rotas
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/student-course', studentCourseRoutes);

// Sincronização do banco de dados
if (process.env.NODE_ENV === 'development') {
    sequelize.sync()
        .then(() => {
            console.log('Banco de dados sincronizado com sucesso.');
        })
        .catch((error) => {
            console.error('Erro ao sincronizar o banco de dados:', error);
        });
}

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Documentação disponível em http://localhost:3000/docs ou https://desafio-trindtech.vercel.app/docs`);
});
