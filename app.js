const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const uplaod = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const {mongoDbUrl} = require('./config/database');
const passport = require('passport');


mongoose.Promise = global.Promise;


//Mongodb with mongoose
mongoose.connect(mongoDbUrl).then(db => {
    console.log('MONGO connected');
}).catch(error => console.log("Could not connect: " + error));

//Using static

app.use(express.static(path.join(__dirname, 'public')));

//Set View Engine

const {select,generateDate} = require('./helpers/handlebars-helpers');

app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateDate:generateDate}}));
app.set('view engine', 'handlebars');

//Uplaod Middlware

app.use(uplaod());

//Body Parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Method Override

app.use(methodOverride('_method'));

//Sessions

app.use(session({

    secret: 'EdgarCh',
    resave: true,
    saveUninitialized: true
}));


app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());


//Local variables using Middleware

app.use((req,res, next)=>{

    res.locals.user = req.user || null;
    res.locals.success_message = req.flash('success-message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();

});


// Load Routes

const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');

//Use routes

app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);

app.listen(4500, () => {
    console.log(`Listening  on port 4500`);
});