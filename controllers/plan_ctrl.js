var Plan = require('../models/plan.js');
var User = require('../models/user.js');

module.exports = {
  show: function (req, res) {
    Plan
      .findOne({
        _id: req.params.id
      }) // from my_plans view on front end - when user clicks on one of their plans
      .exec(function (err, plan) {
        if (err) return console.log(err)
        res.json({
          success: true,
          message: 'post found',
          plan: plan
        });
      })
  },
  index: function (req, res) {
    var searchBy = {};
    if (req.params.city) {
      searchBy['city'] = req.params.city
    }
    Plan
      .find(searchBy)
      .exec(function (err, plans) {
        if (err) return console.log(err)
        res.json({
          success: true,
          message: 'all plans',
          plans: plans
        });
      })
  },
  create: function (req, res) {
    console.log('create invoked from backend ctrl, req.params = ', req.params)
    User
      .findOne({
        _id: req.params.id
      }) // from session/jwt-token/local-storage - refers to current user.
      .exec(function (err, user) {
        console.log('user from ctrl2 = ', user);
        if (err) return console.log(err)
        var new_plan = new Plan(req.body); // form data from create page with events, city, title, etc.
        new_plan.created_by_id = user._id;
        new_plan.save(function (err, plan) {
          if (err) return console.log(err)
          user.created_plans.push(plan);
          user.save(function (err, user) {
            if (err) return console.log(err)
            res.json({
              success: true,
              messge: 'plan created',
              plan: plan
            })
          })
        })
      })
  },
  // all plans user created but not done
  index_user: function (req, res) {
    User
      .findOne({
        _id: req.params.id
      }) // from session/jwt-token/local-storage - refers to current user.
      .exec(function (err, user) {
        if (err) return console.log(err)
        console.log(user._id, '>>> user instance')
        Plan
          .find({
            created_by_id: user._id
          }) // finds all plans that the signed in user has created
          .exec(function (err, plans) {
            if (err) return console.log(err)
            res.json({
              success: true,
              message: 'all plans created by user',
              plans: plans
            });
          })
      })
  },
  // all plans user have completed
  index_rated: function (req, res) {

  },
  // plans of others that user wants to follow
  index_bookmark: function (req, res) {

  },

  update_plan_info: function (req, res) {
    // TODO: mvp + optimization when editing
    Plan
      .findOne({
        _id: req.params.id
      })
      .exec(function (err, plan) {
        if (err) return console.log(err)
        if (req.body.title) {
          plan.title = req.body.title;
        }
        if (req.body.city) {
          plan.city = req.body.city;
        }
        if (req.body.total_cost) {
          plan.total_cost = req.body.total_cost;
        }
        // removes all sub documents 
        while (plan.events.length) {
          console.log(plan.events[0]._id, '<< event')
          plan.events.id(plan.events[0]._id).remove();
        }
        if (req.body.events) {
          plan.events = req.body.events;
        }
        plan.save(function (err, plan) {
          if (err) return console.log(err)
          res.json({
            success: true,
            message: 'plan info updated',
            plan: plan
          })
        })
      })
  },
  delete_plan: function (req, res) {
    User
      .findOne({
        _id: req.params.id
      }) // from session/jwt-token/local-storage - refers to current user.
      .exec(function (err, user) {
        if (err) return console.log(err)
        user.created_plans.pull({
          _id: req.body.plan_id
        }) // removes plan from user's array of plans
        user.save(function (err, user) {
          if (err) return console.log(err)
          Plan
            .findOneAndRemove({
              _id: req.body.plan_id
            }, function (err) { // deletes plan instance... mongodb is no-realational so if we just deleted the plan, it would still exist in the user's array of plans.
              if (err) return console.log(err)
              res.json({
                success: true,
                message: 'plan successfully deleted'
              });
            })
        })
      })
  },
  mark_plan_complete: function(req, res) {
    User
      .findOne({_id: req.body.user_id})
      .exec(function(err, user) {
        if (err) return console.log(err)
        Plan
          .findOne({_id: req.params.id})
          .exec(function(err, plan) {
            if (err) return console.log(err)
            if (!plan.ratings.includes(user._id)) {
              plan.ratings.push(user._id);
            }
            plan
              .save(function(err, plan) {
                if (err) return console.log(err)
                if (!user.rated_plans.includes(plan._id)) {
                  user.rated_plans.push(plan._id);
                }
                user
                  .save(function(err, user) {
                    if (err) return console.log(err)
                    res.json({success: true, message: 'plan has been marked as complete', plan: plan, user: user})
                  })
              })
          })
      })
  },

  mark_plan_incomplete: function(req, res) {
    User
      .findOne({_id: req.body.user_id})
      .exec(function(err, user) {
        if (err) return console.log(err)
        Plan
          .findOne({_id: req.params.id})
          .exec(function(err, plan) {
            if (err) return console.log(err)
            plan.ratings.splice(plan.ratings.indexOf(user._id), 1);
            plan
              .save(function(err, plan) {
                if (err) return console.log(err)
                user.rated_plans.splice(user.rated_plans.indexOf(plan._id), 1);
                user
                  .save(function(err, user) {
                    if (err) return console.log(err)
                    res.json({success: true, message: 'plan has been marked as incomplete', plan: plan, user: user})
                  })
              })
          })
      })
  },

  toggle_bookmark: function(req, res) {
    // req.body => { user_id: 'some val', bookmark: (true or false) }
    User
      .findOne({_id: req.body.user_id}) // from front end body
      .exec(function(err, user) {
        if (err) return console.log(err)
        Plan
          .findOne({_id: req.params.id})
          .exec(function(err, plan){
            if (err) return console.log(err)
            if (req.body.bookmark) {  // from front end body r
              if (!plan.bookmarks.includes(user._id)) {
                plan.bookmarks.push(user._id);
              }
              plan.save(function(err, plan) {
                if (err) return console.log(err)
                if (!user.bookmark_plans.includes(plan._id)) {
                  user.bookmark_plans.push(plan._id)
                }
                user.save(function(err, user) {
                  if (err) return console.log(err)
                  res.json({success: true, message: 'plan has been bookmarked', plan: plan, user: user});
                })
              })
            } else {
              plan.bookmarks.splice(plan.bookmarks.indexOf(user._id), 1);
              plan.save(function(err, plan) {
                if (err) return console.log(err)
                user.bookmark_plans.splice(user.bookmark_plans.indexOf(plan._id), 1);
                user.save(function(err, user) {
                  if (err) return console.log(err)
                  res.json({success: true, message: 'plan has been removed from bookmarks', plan: plan, user: user});
                })
              })
            }
          })
      })
  },
  

  completed: (req, res) => {
    User.findOne({
        _id: req.params.id
      })
      .select('rated_plans')
      .exec(function (err, plans) {
        if (err) return console.log(err);
        if (plans.rated_plans.length) {
          Plan.find({
              _id: {
                $all: plans.rated_plans
              }
            })
            .exec(function (err, plans) {
              if (err) return console.log(err);
              var planInfo = [];
              for (var idx = 0; idx < plans.length; idx++) {
                planInfo.push({
                  title: plans[idx].title,
                  city: plans[idx].city,
                  totalCost: plans[idx].total_cost,
                  p_id: plans[idx]._id
                });
              }
              console.log('plan object: ', planInfo);
              res.json({
                success: true,
                message: 'co plans found',
                plans: planInfo
              });
            })
        } else {
          res.sendStatus(404);
        }
      });
  }
}