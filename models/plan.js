var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planSchema = Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  created_by_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  total_cost: { type: Number },
  events: [ { type: Schema.Types.ObjectId, ref: 'Event' } ],
  ratings: [ { type: Schema.Types.ObjectId, ref: 'User' } ]
})

var Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;