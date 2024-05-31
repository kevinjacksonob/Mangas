const express = require('express');
const sequelize = require('./config/database');
const Manga = require('./models/Manga');
const Pais = require('./models/Pais');
const Tipo = require('./models/Tipo');

// Sincronizar la base de datos
sequelize.sync();

const app = express();
const PORT = 3000;


app.use(express.json());

// Ruta para obtener todos los mangas
app.get('/mangas', async (req, res) => {
  try {
    const mangas = await Manga.findAll({
      include: [
        { model: Pais, attributes: ['nombre'] },
        { model: Tipo, attributes: ['descripcion'] }
      ]
    });
    res.json(mangas);
  } catch (error) {
    console.error('Error al obtener los mangas:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los mangas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get('/mangas/:id', async (req, res) => {
  try {
    const manga = await Manga.findByPk(req.params.id, {
      include: [
        { model: Pais, attributes: ['nombre'] },
        { model: Tipo, attributes: ['descripcion'] }
      ]
    });
    if (manga) {
      res.json(manga);
    } else {
      res.status(404).json({ error: 'Manga no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el manga:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el manga' });
  }
});

app.post('/mangas', async (req, res) => {
  try {
    const newManga = await Manga.create(req.body);
    res.status(201).json(newManga);
  } catch (error) {
    console.error('Error al crear el manga:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el manga' });
  }
});

app.put('/mangas/:id', async (req, res) => {
  try {
    const [updated] = await Manga.update(req.body, {
      where: { id_manga: req.params.id }
    });
    if (updated) {
      const updatedManga = await Manga.findByPk(req.params.id);
      res.json(updatedManga);
    } else {
      res.status(404).json({ error: 'Manga no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el manga:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el manga' });
  }
});

app.delete('/mangas/:id', async (req, res) => {
  try {
    const deleted = await Manga.destroy({
      where: { id_manga: req.params.id }
    });
    if (deleted) {
      res.status(204).json({ message: 'Manga eliminado' });
    } else {
      res.status(404).json({ error: 'Manga no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el manga:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el manga' });
  }
});

app.get('/usuarios/:id_usuario/favoritos', async (req, res) => {
  try {
    const favoritos = await Favorito.findAll({
      where: { id_usuario: req.params.id_usuario },
      include: [
        { model: Manga, include: [{ model: Pais, attributes: ['nombre'] }, { model: Tipo, attributes: ['descripcion'] }] }
      ]
    });
    res.json(favoritos);
  } catch (error) {
    console.error('Error al obtener los favoritos del usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los favoritos del usuario' });
  }
});

app.delete('/usuarios/:id_usuario/favoritos/:id_manga', async (req, res) => {
  try {
    const deleted = await Favorito.destroy({
      where: {
        id_usuario: req.params.id_usuario,
        id_manga: req.params.id_manga
      }
    });
    if (deleted) {
      res.status(204).json({ message: 'Manga eliminado de los favoritos' });
    } else {
      res.status(404).json({ error: 'Favorito no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el favorito:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el favorito' });
  }
});

app.post('/usuarios/:id_usuario/favoritos', async (req, res) => {
  try {
    const favorito = await Favorito.create({
      id_usuario: req.params.id_usuario,
      id_manga: req.body.id_manga,
      fecha_agregado: new Date()
    });
    res.status(201).json(favorito);
  } catch (error) {
    console.error('Error al agregar el favorito:', error);
    res.status(500).json({ error: 'Ocurrió un error al agregar el favorito' });
  }
});

