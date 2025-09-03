const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var flash = require('connect-flash');
const albumRoute = require('./routes/album.routes')
const session = require('express-session');


const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/phototheque');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(flash())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'kingreys',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.redirect('/albums');
})

app.use('/', albumRoute)

app.use((req, res) => {
    res.status(404);
    req.flash('error', "page non trouvé")
    res.send('Page non trouvé')
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});