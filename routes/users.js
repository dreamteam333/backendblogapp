var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/admin', function(req, res, next) {
  models.users.findAll({where: {deleted: false}}).then(usrObj => {
    const usrMap = usrObj.map(users => ({
      userId: users.userId,
      firstName: users.firstName,
      lastName: users.lastName,
      userPhoto: users.userPhoto,
      birthDay: users.birthDay,
      userEmail: users.userEmail,
      phoneNumer: users.phoneNumer,
      userCreatedDate: users.userCreatedDate,
      userAdmin: users.userAdmin,
      deleted: users.deleted,
      userName: users.userName,
      passWord: users.passWord
    }));
    res.send(JSON.stringify(usrMap));
  });
});

router.get('/profile/:id', function(req, res, next) {
  let prflId = parseInt(req.params.id);
  models.users.find({
    where: {
      userId: prflId
    }
  }).then(usr => {
    res.send(JSON.stringify(usr));
    console.log(JSON.stringify(usr));
    console.log(usr.firstName + ' ' + 'Specific Profile Sent.')
  });
});

router.post('/signup', (req, res) => {
  models.users.findOne({
    where: {userName: req.body.userName}
  }).then(user => {
    if (user) {
      console.log('User Already Exists.');
    } else {
      models.users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userPhoto: req.body.userPhoto,
        birthDay: req.body.birthDay,
        userEmail: req.body.userEmail,
        phoneNumer: req.body.phoneNumer,
        userName: req.body.userName,
        passWord: req.body.passWord
      });
      console.log('User Created.');
    }
  });
});

router.put('/profile/:id', function(req, res, next) {
  let uId = parseInt(req.params.id);
  models.users.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userPhoto: req.body.userPhoto,
      birthDay: req.body.birthDay,
      userEmail: req.body.userEmail,
      phoneNumer: req.body.phoneNumer
    },
    {where: {userId: uId}}
  ).then(r => {
    res.send();
    console.log('Updated.')
  });
});

router.delete('/profile/:id/delete', (req, res) => {
  let uId = parseInt(req.params.id);
  models.users.update(
    {deleted: true},
    {where: {userId: uId}}
  ).then(r => {
    res.send();
  });
});

module.exports = router;
