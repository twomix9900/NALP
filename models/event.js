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

// var EventModel = mongoose.model('Event', eventSchema);

// module.exports = EventModel;