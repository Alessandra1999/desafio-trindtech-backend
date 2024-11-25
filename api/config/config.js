const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    ssl: {
        rejectUnauthorized: false, 
    },
    connectionString: process.env.DATABASE_URL,
});

module.exports = sequelize;