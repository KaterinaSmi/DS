// models/book_model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Project = require('./project_model'); // Import Project model

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1000),
  },
  project_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
},
{
  tableName: 'Books',
  timestamps: false,
});

module.exports = Book;
