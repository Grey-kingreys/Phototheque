const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload')
const mongoose = require('mongoose');
const path = require('path');
const albumRoute = require('./routes/album.routes')
var flash = require('connect-flash');


const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/phototheque');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.set('trust proxy', 1) 
// trust first proxy
app.use(session({
  secret: 'kingreys',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash())

app.get('/', (req, res) => {
    res.redirect('/albums');
})

app.use('/', albumRoute)

app.use((req, res) => {
    res.status(404);
    res.send('Page non trouvé')
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});