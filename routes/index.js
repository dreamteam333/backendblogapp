var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');

const db = new sqlite.Database('./blogApp.sqlite', err => {
  if (err) {return console.error(err.message);}
  console.log('Database has been connected.');
});
/*--Blog Code Follows*/
/*For Back End App */
router.get('/blogPosts', function(req, res, next) {
  models.blogPosts.findAll({}).then(pstFnd => {
    res.render('blogPosts', {
      blogPosts: pstFnd
    })
  });
});

/*For Front End App */
router.get('/blogList', function(req, res, next){
  models.blogPosts.findAll({}).then(resObj => {
    const postsMap = resObj.map(blogPosts => ({
      blogId: blogPosts.blogId,
      blogTitle: blogPosts.blogTitle,
      blogMessage: blogPosts.blogMessage,
      blogLikes: blogPosts.blogLikes,
      blogPhoto: blogPosts.blogPhoto,
      blogDate: blogPosts.blogDate,
      deleted: blogPosts.deleted
    }));
    res.send(JSON.stringify(postsMap));
    /*console.log(JSON.stringify(postsMap));*/
  });
});

router.get('/blog', function(req, res, next) {
  models.blogPosts.find({
    where: {blogId: 2}
  }).then(blog => {
    res.render('specificBlog', {blog: blog});
  });
});
/*This route is for this back end app not for the front end.*/
router.get('/blog/:id', function(req, res, next) {
  let blgId = parseInt(req.params.id);
  models.blogPosts.find({
    where: {blogId: blgId}
  }).then(blog => {
    res.render('specificBlog', {blog: blog});
  });
});
/*This route is for the front end app only*/
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
/*This route is for Back End WORKING*/
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
  })
})

module.exports = router;
