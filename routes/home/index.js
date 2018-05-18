const express = require('express');
const router = express.Router();
const Post =require('../../models/Post');


router.all('/*', (req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

//Home Page

router.get('/', (req, res) => {

    Post.find({}).then(posts=>{

        res.render('home/index', {posts:posts});

    });
});

//About Page

router.get('/about', (req, res) => {

    res.render('home/about');
});

//Login Page

router.get('/login', (req, res) => {

    res.render('home/login');
});

//Register Page

router.get('/register', (req, res) => {

    res.render('home/register');
});
//Post
router.get('/post/:id', (req, res) => {
    Post.findOne({_id: req.params.id})
        .then(post=>{
            res.render('home/post',{post: post});
        });
});

module.exports = router;