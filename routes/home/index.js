const express = require('express');
const router = express.Router();
const Post =require('../../models/Post');
const Category = require('../../models/Category');



router.all('/*', (req,res,next)=>{
    req.app.locals.layout = 'home';
    next();
});

//Home Page

router.get('/', (req, res) => {

    Post.find({}).then(posts=>{

        Category.find({}).then(categories=>{

            res.render('home/index', {posts:posts, categories:categories});

        });



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
        .then(post => {

            Category.find({}).then(categories => {
                res.render('home/post', {post: post, categories: categories});
            });
        });
});

module.exports = router;