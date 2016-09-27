var db = require('./db/db').sequelize;
var User = require('./db/db').User;
var Hyper = require('./db/db').Hyper;

var utils = {

  // USERS
  createUser: function (username, password) {
    User.sync()
      .then(function () {
        return User.create({
          username: username,
          password: password
        });
      });
  },

  loginUser: function (req, res) {

    db.query('SELECT * FROM Users WHERE username = :username AND password = :password',
      {replacements: {username: req.body.username, password: req.body.password}, type: db.QueryTypes.SELECT })
      .then(function (results) {
        if (results.length === 1) {
          res.send('Login successful!');
        } else {
          res.status(400).send('Information provided does not match records.');
        }
      });
  },

  // HYPERS (Post request to /link)
  saveHyper: function (req, res) {
    console.log('SAVEHYPER BEING CALLED!! and here is req ', req.body);
    Hyper.sync()
    .then(function (req, res) {
      return Hyper.create({
        url: 'TESTER!!',
        title: '',
        description: '',
        image: ''
      });
      console.log('great we added a hyper and the request body was, ', req.body);
    });
  }

};

module.exports = utils;