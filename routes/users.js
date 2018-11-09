var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/admin', function(req, res, next) {
  models.users.findAll({where: {deleted: "false"}}).then(usrObj => {
    const usrMap = usrObj.map(users => ({
      userId: users.userId,
      firstName: users.firstName,
      lastName: users.lastName,
      userPhoto: users.userPhoto,
      birthDay: users.birthDay,
      userEmail: users. userEmail,
      phoneNumer: users.phoneNumer,
      userCreatedDate: users.userCreatedDate,
      userAdmin: users.userAdmin,
      deleted: users.deleted
    }));
    res.send(JSON.stringify(usrMap));
  });
});

module.exports = router;
