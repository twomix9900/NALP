var Plan = require('../models/plan.js');
var User = require('../models/user.js');

module.exports = {
  bookmarked: (req,res) => {
    var query = User.findOne({email: req.body.email})
    .select('bookmark_plans')
    .exec(function(err, plans) {
      if (err) return console.log(err);
      if (plans.length) {
        res.json({ success: true, message: 'plans found', plans: plans})
      } else {
        res.sendStatus(404);
      }
    });
  },

  created: (req, res) => {
    var query = User.findOne({email: req.body.email})
    .select('created_plans')
    .exec(function(err, plans) {
      if (err) return console.log(err);
      if (plans.length) {
        res.json({ success: true, message: 'plans found', plans: plans})
      } else {
        res.sendStatus(404);
      }
    });
},

  completed: (req, res) => {
    var query = User.findOne({email: req.body.email})
    .select('rated_plans')
    .exec(function(err, plans) {
      if (err) return console.log(err);
      if (plans.length) {
        res.json({ success: true, message: 'plans found', plans: plans})
      } else {
        res.sendStatus(404);
      }
    });
  }
}
