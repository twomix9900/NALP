var Plan = require('../models/plan.js');
var User = require('../models/user.js');

errHandler = (err, errStatus) => {
  console.log('error- does not compute', err);
  res.sendStatus(errStatus);
}


module.exports = {
  bookmarked: (req,res) => {
    console.log('req.params ', req.params);
    User.findOne({_id: req.params.id})
    .select('bookmark_plans')
    .exec(function(err, plans) {
      if (err) errHandler(err, 404);
      console.log('plans ', plans);
      if (plans.bookmark_plans.length) {
        Plan.find({ _id: { $in : plans.bookmark_plans } })
          .exec(function(err, plans) {
          if (err) errHandler(err, 404);
          var planInfo = [];
            for (var idx = 0; idx < plans.length; idx ++) {
              planInfo.push({ title: plans[idx].title, city: plans[idx].city, totalCost: plans[idx].total_cost, p_id: plans[idx]._id });
            }
          console.log('plan object: ', planInfo);
          res.json({ success: true, message: 'bm plans found', plans: planInfo});
        })  
      } else {
        res.json({ success: false, message: 'no plans available', plans: [{ title: '', city: 'Sorry, you do not have any plans bookmarked', total_cost: null }, { title: '', city: 'Please bookmark some plans first', total_cost: null }] });
      }
    });
  },

  created: (req, res) => {
    User.findOne({_id: req.params.id})
    .select('created_plans')
    .exec(function(err, plans) {
      if (err) errHandler(err, 404);
      if (plans.created_plans.length) {
        Plan.find({ _id: { $in : plans.created_plans } })
          .exec(function(err, plans) {
          if (err) errHandler(err, 404);
          var planInfo = [];
            for (var idx = 0; idx < plans.length; idx ++) {
              planInfo.push({ title: plans[idx].title, city: plans[idx].city, totalCost: plans[idx].total_cost, p_id: plans[idx]._id });
            }
          console.log('plan object: ', planInfo);
          res.json({ success: true, message: 'cr plans found', plans: planInfo});

        })  
      } else {
        res.json({ success: false, message: 'no plans available', plans: [{ title: '', city: 'Sorry, you have not created any plans', total_cost: null }, { title: '', city: 'Create some plans first', total_cost: null }] });
      }
    });
},

  completed: (req, res) => {
    User.findOne({_id: req.params.id})
    .select('rated_plans')
    .exec(function(err, plans) {
      if (err) errHandler(err, 404);
      if (plans.rated_plans.length) {
        Plan.find({ _id: { $in : plans.rated_plans } })
          .exec(function(err, plans) {
          if (err) errHandler(err, 404);
          var planInfo = [];
            for (var idx = 0; idx < plans.length; idx ++) {
              planInfo.push({ title: plans[idx].title, city: plans[idx].city, totalCost: plans[idx].total_cost, p_id: plans[idx]._id });
            }
          console.log('plan object: ', planInfo);
          res.json({ success: true, message: 'co plans found', plans: planInfo});
        })  
      } else {
        res.json({ success: false, message: 'no plans available', plans: [{ title: '', city: 'Sorry, you have not completed any of your plans', total_cost: null }, { title: '', city: 'Finish a plan and rate your day', total_cost: null }] });
      }
    });
  },
}

