var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');

const db = new sqlite.Database('./blogApp.sqlite', err => {
  if (err) {return console.error(err.message);}
  console.log('Database has been connected.');
});

router.get('/blogPosts', function(req, res, next) {
  models.blogPosts.findAll({}).then(pstFnd => {
    res.render('blogPosts', {
      blogPosts: pstFnd
    })
  });
});


router.get('/', function(req, res, next){
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

module.exports = router;
