const { Sequelize } = require('sequelize');

// Set up Sequelize connection
const sequelize = new Sequelize('dms_test', 'root', 'admin1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Turn off logging in production
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;