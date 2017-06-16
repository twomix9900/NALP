var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  rated_plans: [ { type: Schema.Types.ObjectId, ref: 'Plan' } ],
  created_plans: [ { type: Schema.Types.ObjectId, ref: 'Plan' } ],
  bookmark_plans: [ {type: Schema.Types.ObjectId, ref: 'Plan'} ]
})

var User = mongoose.model('User', userSchema);

module.exports = User;
