const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


router.all('/*', (req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});


router.get('/',(req,res)=>{

    res.send('IT WORKS');

});


router.get('/create',(req,res)=>{

    res.render('admin/posts/create');

});

router.post('/create',(req,res)=>{

    let allowComments = true;

    if(req.body.allowComments) {
        allowComments = true;
    } else  {
        allowComments = false;
    }

    Post({

        title: req.body.title,
        status: req.body.status,
        allowComments: req.body.allowComments,
        body: req.body.body



    });

   // console.log(req.body);

});


module.exports = router;