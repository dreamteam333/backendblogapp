var express = require('express');
var router = express.Router();
var models = require('../models');
const auth = require("../config/auth");
/*GET all Users.*/
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
/*GET specific Users.*/
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
/*CREATE a User.*/
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

/*router.post('/login', function(req, res, next) {
  models.users.findOne(
    {
      where: {
        userName: req.body.userName
      }
    })
    .then(user => {
      if(!user){
        console.log('Not User!');
        res.status(500).send({status: 500, message: 'User Not Found!', type: 'Internal!'})
      } else {
      res.send(JSON.stringify(user));
      console.log(JSON.stringify(user));
      }
    });
});*/

router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      userName: req.body.userName,
      passWord: req.body.passWord
    }
  }).then(user => {
    console.log('login found a user')
    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (user) {
      const usrId = user.userId;
      const token = auth.signUser(user);
      res.cookie('jwt', token);
      res.send(JSON.stringify(user));
    } else {
      console.log(req.body.passWord);
    }

  });
});

router.get('/logout', function (req, res) {
  res.cookie('jwt', null);
  res.send({message: "Logged Out"})
  console.log('Logged Out!');
});

/*UPDATE a User. */
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
/*DELETE a User.*/
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
