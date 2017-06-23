var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = Schema({
  email: { type: String, unique: true, required: true },
  rated_plans: [ { type: Schema.Types.ObjectId, ref: 'Plan', unique: true } ],
  created_plans: [ { type: Schema.Types.ObjectId, ref: 'Plan' } ],
  bookmark_plans: [ {type: Schema.Types.ObjectId, ref: 'Plan', unique: true} ]
})

var User = mongoose.model('User', userSchema);  

module.exports = User;
