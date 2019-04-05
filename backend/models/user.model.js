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
    productivity: {
      api_key: String,
      data: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Productivity'
        }
      ]
    },
    fitness: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fitness'
      }
    ]
  }
);

module.exports = mongoose.model('User', UserSchema)
