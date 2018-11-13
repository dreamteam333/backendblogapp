var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');

const db = new sqlite.Database('./blogApp.sqlite', err => {
  if (err) {return console.error(err.message);}
  console.log('Database has been connected.');
});
/*--Blog Code Follows*/

/*For Front End App GET all non-deleted blogs.*/
router.get('/blogList', function(req, res, next){
  models.blogPosts.findAll({where: {deleted: false}}).then(resObj => {
    const postsMap = resObj.map(blogPosts => ({
      blogId: blogPosts.blogId,
      blogTitle: blogPosts.blogTitle,
      blogMessage: blogPosts.blogMessage,
      blogLikes: blogPosts.blogLikes,
      blogPhoto: blogPosts.blogPhoto,
      blogDate: blogPosts.blogDate,
      deleted: blogPosts.deleted,
      blogViews: blogPosts.blogViews
    }));
    res.send(JSON.stringify(postsMap));
    /*console.log(JSON.stringify(postsMap));*/
  });
});
/*BackEnd GET*/
router.get('/blog', function(req, res, next) {
  models.blogPosts.find({
    where: {blogId: 2}
  }).then(blog => {
    res.render('specificBlog', {blog: blog});
  });
});

/*This route is for the front end app GET Specific Blog.*/
router.get('/blogList/:id', function(req, res, next) {
  let bId = parseInt(req.params.id);
  models.blogPosts.find({
    where: {
      blogId: bId
    }
  }).then(blog => {
    res.send(JSON.stringify(blog));
    console.log(JSON.stringify(blog));
    console.log('Specific Blog Sent.')
  });
});
/*This route is for front End UPDATE a Blog.*/
router.put('/blogList/:id', function(req, res, next) {
  let blId = parseInt(req.params.id);
  models.blogPosts.update(
    {
      blogTitle: req.body.blogTitle,
      blogMessage: req.body.blogMessage
    },
    {where: {blogId: blId}}
  ).then(r => {
    res.send();
    console.log('Updated.')
  });
});
/*This route for Front End CREATE a Blog.*/
router.post('/blogList', (req, res) => {
  models.blogPosts.findOrCreate({
    where: {
      blogTitle: req.body.blogTitle,
      blogMessage: req.body.blogMessage
    }
  }).spread(function(result, created) {
    if (created) {
      console.log("Created.");
    }else {
      console.log('Not Created');
    }
  });
});
/*For Front End DELETE a Blog.*/
router.delete('/blogList/:id/delete', (req, res) => {
  let bloId = parseInt(req.params.id);
  models.blogPosts.update(
    {deleted: true},
    {where: {blogId: bloId}}
  ).then(blg => {
    res.send();
  });
});

module.exports = router;
