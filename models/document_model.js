// models/document_model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Project = require('../models/project_model');
const Book = require('../models/book_model');

// Define Document model
const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(1000),
  },
  description: {
    type: DataTypes.STRING(1000),
  },
  owner: {
    type: DataTypes.STRING(255),
  },
  revision: {
    type: DataTypes.STRING(1000),
  },
  state: {
    type: DataTypes.STRING(100),
  },
  releasedate: {
    type: DataTypes.DATE, // DATE instead of STRING(1000)
  },
  author: {
    type: DataTypes.STRING(255),
  },
  approveddate: {
    type: DataTypes.DATE, // DATE instead of STRING(1000)
  },
  createdon: {
    type: DataTypes.DATE, // DATE instead of STRING(1000)
  },
  releasetype: {
    type: DataTypes.STRING(255),
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
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
},
{
  tableName: 'Documents',
  timestamps: false,
});

module.exports = Document;
