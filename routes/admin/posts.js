const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const {isEmpty, uploadDir} = require('../../helpers/upload-helper');
const fs = require('fs');



router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';

    next();
});


router.get('/', (req, res) => {

    Post.find({}).then(posts => {

        res.render('admin/posts', {posts: posts});

    });

});


router.get('/create', (req, res) => {

    res.render('admin/posts/create');

});

router.post('/create', (req, res) => {

    let errors = [];

    if (!req.body.title) {
        errors.push({message: 'Please add a title'});

    }
        if (!req.body.body) {
        errors.push({message: 'Please add a description'});

    }

    if (errors.length > 0) {
        res.render('admin/posts/create', {
            errors: errors
        })
    }else
        {

            let filename = 'lambo_hurican.jpg';

            if (!isEmpty(req.files)) {

                let file = req.files.file;
                filename = Date.now() + '-' + file.name;


                file.mv('./public/uploads/' + filename, (err) => {

                    if (err) throw  err;

                });
            }

            let allowComments = true;
            if (req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }

            const newPost = new Post({

                title: req.body.title,
                status: req.body.status,
                allowComments: allowComments,
                body: req.body.body,
                file: filename


            });

            newPost.save().then(savedPost => {

                req.flash('success-message', `Post ${savedPost.title} was created successfully `);

               // console.log(savedPost);

                res.redirect('/admin/posts');

            }).catch(error => {
                console.log("Could not save post: " + error);
            });


        }




    // console.log(req.body);

});

//Edit route

router.get('/edit/:id', (req, res) => {


    Post.findOne({_id: req.params.id})
        .then(post => {

            res.render('admin/posts/edit', {post: post});

        });
});


router.put('/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id})

        .then(post => {

            if (req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }
            post.title = req.body.title;
            post.status = req.body.status;
            post.allowComments = allowComments;
            post.body = req.body.body;


            if (!isEmpty(req.files)) {

                let file = req.files.file;
                filename = Date.now() + '-' + file.name;
                post.file = filename;

                file.mv('./public/uploads/' + filename, (err) => {

                    if (err) throw  err;
                });
            }


            post.save().then(updatedPost => {

                req.flash('success-message', 'Post  was successfully updated');


                res.redirect('/admin/posts');
            });
        });
});

router.delete('/:id', (req, res) => {

    Post.remove({_id: req.params.id})

        .then(result => {


            req.flash('success-message', 'Post was successfully deleted');
            res.redirect('/admin/posts');

        });

});

module.exports = router;