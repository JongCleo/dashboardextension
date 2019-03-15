let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      require: true,
      unique: true
    },
    // provider: String,
    // provider_id: String,
    // token: String,
    metric_system: Boolean,
    //something for order of graphs
    graph_order: [
      {
        graph_name: String
      }
    ],
    productivity: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductivityDay'
      }
    ],
    finance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FinanceDay'
      }
    ],
    meditation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MeditationDay'
      }
    ]
  }
);

// UserSchema.methods.follow = function(user_id) {
//   if (this.following.indexOf(user_id) === -1){
//     this.following.push(user_id)
//   }
//   return this.save()
// }
//
// UserSchema.methods.addFollower = function (fs) {
//     this.followers.push(fs)
// }

module.exports = mongoose.model('User', UserSchema)
