const Album = require('../models/Album')
const path = require('path')
const fs = require('fs')
const { error } = require('console')


const albums = async (req, res) => {
    const albums = await Album.find()
    res.render('albums', {title: 'Mes albums', albums})
}

const createAlbumForm = (req, res) => {
  res.render('new-album', { 
    title: 'Nouvel album',
    errors: req.flash('error') })
}

const createAlbum = async (req, res) => {
    try {
        if(!req.body.albumTitle){
             req.flash('error', "Erreur Le titre ne dois pas etre vide")
            res.redirect('/albums/create');
            return;
        }
        await Album.create({
            title: req.body.albumTitle,
        });
        res.redirect('/albums');
    } catch (error) {
        req.flash('error', "Erreur lors de la creation de l'album")
        res.redirect('/albums/create');
    }
};

const album = async (req, res) => {
    try{
        const idAlbum = req.params.id;
        const album = await Album.findById(idAlbum)
        res.render('album', {
            title: `Mon album ${album.title}`,
            album,
            errors: req.flash('error'),
        })
    }catch(err){
        console.log(err)
        res.redirect('/404')
    };
}

const addImage = async(req, res) => {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);

    if(!req?.files?.image){
        req.flash('error', "Aucun fichier mis en ligne")
        res.redirect(`/albums/${idAlbum}`)
        return;
    }

    const image =req.files.image

    if(image.mimetype != 'image/jpeg' && image.mimetype != 'image/png'){
        req.flash('error', "Il faut une image au format png ou jpeg")
        res.redirect(`/albums/${idAlbum}`)
        return;
    }

    if(image.size > 10000000){
        req.flash('error', "La taille de l'image est trop grande")
        res.redirect(`/albums/${idAlbum}`)
        return;
    }

    const folderPath = path.join(__dirname, '../public/upload', idAlbum)
    fs.mkdirSync(folderPath, {recursive: true})

    const imageName = image.name;
    const localpath = path.join(folderPath, imageName);

    await req.files.image.mv(localpath);
    console.log(req.files);

    album.images.push(imageName)
    album.save()

    res.redirect(`/albums/${idAlbum}`);

}

const deleteImage = async (req, res) => {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum)

    const imageIndex = req.params.imageIndex
    

    const image = album.images[imageIndex]
    if(!image) {
        res.redirect(`/albums/${idAlbum}`);
        return;
    }

    album.images.splice(imageIndex, 1)
    await album.save();

    const imagePath = path.join(__dirname, '../public/upload', idAlbum, image);
    fs.unlinkSync(imagePath)

    res.redirect(`/albums/${idAlbum}`)

}

module.exports = {
    albums,
    album,
    createAlbumForm,
    createAlbum,
    addImage,
    deleteImage,
}