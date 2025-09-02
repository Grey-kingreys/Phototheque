const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const albumRoute = require('./routes/album.routes')
const { title } = require('process');


const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/phototheque');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));




app.get('/', (req, res) => {
    res.render('album', {title: 'Photothèque'})
})

app.use('/', albumRoute)

app.use((req, res) => {
    res.status(404);
    res.send('Page non trouvé')
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});