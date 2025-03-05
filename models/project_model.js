// models/project_model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Project = sequelize.define('Project', {
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
    allowNull: true,
  },
},
{
  tableName: 'projects',
  timestamps: false,
});

module.exports = Project;
