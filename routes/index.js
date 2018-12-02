var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');
var fs = require('fs-extra');

router.get('/', function(req, res, next) {
  res.render('index');
});

/*For Front End App GET all non-deleted blogs.*/
router.get('/blogList', function(req, res, next){
  models.blogPosts.findAll({
    where: {deleted: false}
  }).then(resObj => {
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

router.get('/comments', function(req, res, next){
  models.comments.findAll({where: {deleted: false}}).then(resObj => {
    const comMap = resObj.map(com => ({
      comId: com.comId,
      comMessage: com.comMessage,
      blogId: com.blogId,
      userId: com.userId,
      comLikes: com.comLikes,
      comCreatedDate: com.comCreatedDate,
      deleted: com.deleted
    }));
    res.send(JSON.stringify(comMap));
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
    },
    include: [models.comments]
  }).then(blog => {
    res.send(JSON.stringify(blog));
    console.log(JSON.stringify(blog));
    console.log('Specific Blog Sent.')
  });
});
/*GET Specific Comment*/
router.get('/comments/:id', function(req, res, next) {
  let cmId = parseInt(req.params.id);
  models.comments.find(
    {where:{comId: cmId, deleted: false},
    include: [models.blogPosts, models.users]
  }).then(com => {
  res.send(JSON.stringify(com));
  });
});
/*GET Com for BlogId*/
router.get('/com/:id', function(req, res, next) {
  let bId = parseInt(req.params.id);
  models.comments.findAll({
    where: {blogId: bId, deleted: false},
    include: [models.users]
  }).then(com => {
    res.send(JSON.stringify(com));
  });
});

/*This route is for front End UPDATE a Blog.*/
router.put('/blogList/:id', function(req, res, next) {
  let blId = parseInt(req.params.id);
  models.blogPosts.update(
    {
      blogTitle: req.body.blogTitle,
      blogMessage: req.body.blogMessage,
      blogPhoto: req.body.blogPhoto
    },
    {where: {blogId: blId}}
  ).then(r => {
    res.send();
    console.log('Updated.')
  });
});
/*UPDATE Specific Comment.*/
router.put('/comments/:id', function(req, res, next) {
  let cmntId = parseInt(req.params.id);
  models.comments.update(
    {
      comMessage: req.body.comMessage
    },
    {where: {comId: cmntId},
  }).then(r => {
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
/*CREATE a comment*/
router.post('/comments/:id', (req, res) => {
  let bId = parseInt(req.params.id);
  models.comments.create({
      comMessage: req.body.comMessage,
      blogId: bId
    }).then(function(result, created) {
    if (created) {
      console.log("Created.");
    }else {
      console.log('Not Created');
    }
  });
});

router.post('/uploadBlgImg/:id', function(req, res) {
  let imId = parseInt(req.params.id);
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      console.log("Now Uploading: " + filename);
      fstream = fs.createWriteStream('public/images/' + (imId + 'blgimg' + filename));
      file.pipe(fstream);
      fstream.on('close', function () {    
          console.log("Finished Upload of: " + filename);              
      });
      res.send(JSON.stringify(filename + ' has been uploaded.'));
  });
})

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
/*DELETE a Comment Admin Only*/
router.delete('/comments/:id/delete', (req, res) => {
  let commId = parseInt(req.params.id);
  models.comments.update(
    {deleted: true},
    {where: {comId: commId}}
  ).then(com => {
    res.send();
  });
});

module.exports = router;
