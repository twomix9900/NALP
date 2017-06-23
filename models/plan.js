var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var eventSchema = Schema({
  address: { type: String, required: true },
  photo: { type: String },
  start_time: { type: String, required: true}, // make start time unique 
  event_type: { type: String },
  plan_id: { type: Schema.Types.ObjectId, ref: 'Plan' },
  cost: { type: String }
})

var planSchema = Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  created_by_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total_cost: { type: Number },
  events: [ eventSchema ],
  ratings: [ { type: Schema.Types.ObjectId, ref: 'User', unique: true } ],
  bookmarks: [ { type: Schema.Types.ObjectId, ref: 'User', unique: true } ]
})


var Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;