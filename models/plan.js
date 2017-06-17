var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var eventSchema = Schema({
  address: { type: String, required: true },
  photo: { type: String },
  start_time: { type: String, required: true },
  event_type: { type: String },
  plan_id: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  cost: { type: String }
})

var planSchema = Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  created_by_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total_cost: { type: Number },
  events: [ eventSchema ],
  ratings: [ { type: Schema.Types.ObjectId, ref: 'User' } ]
})


var Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;