const Album = require('../models/Album')


const albums = async (req, res) => {
    const albums = await Album.find()
    res.render('albums', {title: 'Mes albums', albums})
}

const album = (req, res) => {
    console.log(req.params)
    res.render('album', {
        title: 'album'
    })
}

const createAlbumForm = (req, res) => {
  res.render('new-album', { title: 'Nouvel album' })
}

const createAlbum = async (req, res) => {

    try {
        await Album.create({
            title: req.body.albumTitle,
        });
    res.redirect('/albums');
    } catch (error) {
        console.log(error)
        messageErrer = "Erreur lors de la creation de l'album"
        console.log(messageErrer)
        res.redirect('/albums/create');
    }
};

module.exports = {
    albums,
    album,
    createAlbumForm,
    createAlbum,
    
}