var Plan = require('../models/plan.js');
var User = require('../models/user.js');

module.exports = {
  bookmarked: (req,res) => {
    console.log('req.params ', req.params);
    User.findOne({_id: req.params.id})
    .select('bookmark_plans')
    .exec(function(err, plans) {
      if (err) return sendStatus(404);
      if (plans.bookmark_plans.length) {
        Plan.find({ _id: { $all : plans.bookmark_plans } })
          .exec(function(err, plans) {
          if (err) return sendStatus(404);
          var planInfo = [];
            for (var idx = 0; idx < plans.length; idx ++) {
              planInfo.push({ title: plans[idx].title, city: plans[idx].city, totalCost: plans[idx].total_cost, p_id: plans[idx]._id });
            }
          console.log('plan object: ', planInfo);
          res.json({ success: true, message: 'bm plans found', plans: planInfo});
        })  
      } else {
        res.sendStatus(404);
      }
    });
  },

  created: (req, res) => {
    User.findOne({_id: req.params.id})
    .select('created_plans')
    .exec(function(err, plans) {
      if (err) return sendStatus(404);
      if (plans.created_plans.length) {
        Plan.find({ _id: { $all : plans.created_plans } })
          .exec(function(err, plans) {
          if (err) return sendStatus(404);
          var planInfo = [];
            for (var idx = 0; idx < plans.length; idx ++) {
              planInfo.push({ title: plans[idx].title, city: plans[idx].city, totalCost: plans[idx].total_cost, p_id: plans[idx]._id });
            }
          console.log('plan object: ', planInfo);
          res.json({ success: true, message: 'cr plans found', plans: planInfo});
        })  
      } else {
        res.sendStatus(404);
      }
    });
},

  completed: (req, res) => {
    User.findOne({_id: req.params.id})
    .select('rated_plans')
    .exec(function(err, plans) {
      if (err) return sendStatus(404);
      if (plans.rated_plans.length) {
        Plan.find({ _id: { $all : plans.rated_plans } })
          .exec(function(err, plans) {
          if (err) return sendStatus(404);
          var planInfo = [];
            for (var idx = 0; idx < plans.length; idx ++) {
              planInfo.push({ title: plans[idx].title, city: plans[idx].city, totalCost: plans[idx].total_cost, p_id: plans[idx]._id });
            }
          console.log('plan object: ', planInfo);
          res.json({ success: true, message: 'co plans found', plans: planInfo});
        })  
      } else {
        res.sendStatus(404);
      }
    });
  },
}

