var User = require('../models/user.js');

module.exports = {
  index: function(req, res) {
    User
      .find({})
      .exec( function(err, users) {
        if (err) return console.log(err)
        res.json({ success: true, message: 'all users', users: users })
      })
  },
  create: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
      if (err) return console.log(err)
      res.json({success: true, message: 'user created', user: user});
    })
  },
  show: function(req, res) {
    User
      .findOne({_id: req.params.id})
      .exec(function(err, user) {
        if (err) return console.log(err)
        res.json({success: true, message: 'user found', user: user});
      })
  },
  update_user: function(req, res) {
    User
      .findOne({_id: req.params.id})
      .exec(function(err, user){
        if (err) return console.log(err)
        if (req.body.email) {
          user.email = req.body.email;
        }
        if (req.body.password) {
          user.password = req.body.password;
        }
        user.save(function(err, user) {
          if (err) return console.log(err)
          res.json({success: true, message: 'user info updated', user: user})
        })
      })
  },
  delete_user: function(req, res) {
    User
      .findOneAndRemove({_id: req.params.id}, function(err) {
        if (err) return console.log(err)
        res.json({success: true, message: 'user successfully deleted'})
      })
  }
}