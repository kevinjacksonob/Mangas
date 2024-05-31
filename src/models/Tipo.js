const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tipo = sequelize.define('Tipo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tipo',
  timestamps: false
});

module.exports = Tipo;
