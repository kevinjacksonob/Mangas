const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pais = require('./Pais');
const Tipo = require('./Tipo');

const Manga = sequelize.define('Manga', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_lanzamiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  temporadas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pais_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Pais,
      key: 'id_pais'
    }
  },
  anime: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  juego: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pelicula: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Tipo,
      key: 'id_tipo'
    }
  }
}, {
  tableName: 'manga',
  timestamps: false
});

Manga.belongsTo(Pais, { foreignKey: 'pais_id' });
Manga.belongsTo(Tipo, { foreignKey: 'tipo_id' });

module.exports = Manga;
