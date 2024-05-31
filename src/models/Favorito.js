const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Manga = require('./Manga');

const Favorito = sequelize.define('Favorito', {
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id_usuario'
    },
    primaryKey: true
  },
  manga_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Manga,
      key: 'id_manga'
    },
    primaryKey: true
  }
 
}, {
  tableName: 'favorito',
  timestamps: false
});

Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Manga, { foreignKey: 'manga_id' });

module.exports = Favorito;
