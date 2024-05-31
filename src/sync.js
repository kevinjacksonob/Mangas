const sequelize = require('./config/database');
const Pais = require('./models/Pais');
const Tipo = require('./models/Tipo');
const Manga = require('./models/Manga');
const Usuario = require('./models/Usuario');
const Favorito = require('./models/Favorito');

async function sync() {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada.');
  } catch (error) {
    console.error('no se pudo apa:', error);
  } finally {
    await sequelize.close();
  }
}

sync();
