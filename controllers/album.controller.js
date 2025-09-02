const Album = require('../models/Album')


const createAlbumForm = (req, res) => {
  res.render('new-album', { title: 'Nouvel album' })
}

const createAlbum = async (req, res) => {

    try {
        await Album.create({
            title: req.body.albumTitle,
            errors: req.flash('error'),
        });
    res.redirect('/');
    } catch (error) {
        console.error(error)
        req.flash('error', 'Une erreur est survenue lors de la création de l\'album.')
        res.redirect('/albums/create');
    }
};

module.exports = {
    createAlbumForm,
    createAlbum
}