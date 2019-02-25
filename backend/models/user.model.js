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
    ProductivityData: [
      {
        date: Date,
        productive_time: Number,//minutes
        neutral_time: Number,//minutes
        distracted_time: Number,//minutes
      }
    ],
    FinanceData: [
      {
        date: Date,
        category: Number,//minutes
        spend: Number,//minutes
      }
    ],
    MeditationData: [
      {
        date: Date,
        meditation_time: Number,//minutes
      }
    ]
    // ProductivityData: [
    //   {
    //   }
    // ]
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
