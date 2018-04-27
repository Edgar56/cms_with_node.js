const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

//Mongodb with mongoose
mongoose.connect('mongodb://localhost:27017/cms').then(db=>{
    console.log('MONGO connected');
}).catch(error => console.log("Could not connect: " + error));

app.use(express.static(path.join(__dirname, 'public')));

//Set View Engine

const {select} = require('./helpers/handlebars-helpers');

app.engine('handlebars', exphbs({defaultLayout: 'home',helpers:{select:select()}}));
app.set('view engine','handlebars');

//Body Parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Load Routes

const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

//Use routes

app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);

app.listen(4500, () => {
    console.log(`Listening  on port 4500`);
});