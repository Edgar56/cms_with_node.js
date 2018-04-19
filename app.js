const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//Mongodb with mongoose
mongoose.connect('mongodb://localhost:27017/cms').then(db=>{
    console.log('MONGO connected');
}).catch(error => console.log("Could not connect: " + error));

app.use(express.static(path.join(__dirname, 'public')));

//Set View Engine

app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine','handlebars');

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