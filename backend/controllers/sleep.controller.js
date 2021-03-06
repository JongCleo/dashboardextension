config = require('../config.json');
const FitbitApiClient = require("fitbit-node");
const fitclient = new FitbitApiClient({
	clientId: config.FB_CLIENT_ID,
	clientSecret: config.FB_CLIENT_SECRET,
	apiVersion: '2.0' // 1.2 is the default
});
let UserModel = require('../models/user.model')
let SleepModel = require('../models/sleep.model')

exports.fitbit_authorize = function(req, res) {
  res.redirect(fitclient.getAuthorizeUrl('profile sleep', 'http://localhost:4000/fitbit/callback'));
}

exports.fitbit_callback = function(req, res) {
  // exchange the authorization code we just received for an access token
	fitclient.getAccessToken(req.query.code, 'http://localhost:4000/fitbit/callback').then(result => {
		// use the access token to fetch the user's profile information
		fitclient.get("/profile.json", result.access_token).then(results => {

			var temp_data = [
				{
					date: "2019-04-06",
					snapshot: [{
						label: "deep",
						value: 1.43
					},
					{
						label: "light",
						value: 3.88
					},
					{
						label: "rem",
						value: 1.58
					},
					{
						label: "wake",
						value: 0.46
					}]
				},
				{
					date: "2019-04-07",
					snapshot: [{
						label: "deep",
						value: 1.08
					},
					{
						label: "light",
						value: 4.05
					},
					{
						label: "rem",
						value: 1.42
					},
					{
						label: "wake",
						value: 0.25
					}]
				},
		];
			SleepModel.create(temp_data, function(err, sleepdays){
	      var just_object_ids = []
	      sleepdays.forEach(function(item){
	        just_object_ids.push(item['_id'])
	      })

	      UserModel.findOneAndUpdate(
	        {email: req.session.email},
	        {
	          "$push": {
	            "graph_order": {
	              "graph_name":"sleep"
	            },
	            "sleep.data": {
	              "$each" : just_object_ids
	            }
	          }
	        })
	        .then (doc => {
	          res.redirect('/settings')
	        })
	        .catch (err=> {res.stats(500).json(err)})
	    })

		}).catch(err => {
			res.status(err.status).send(err);
		});
	}).catch(err => {
		res.status(err.status).send(err);
	});
}

// DELETE sleep dash data
exports.fitbit_delete = function(req, res) {
  UserModel.findOneAndUpdate(
    {email: req.session.email},
    {
      "$pull": {
        "graph_order": {
          "graph_name":"sleep"
        }
      },
      "$set": {
        "sleep.data": []
      }
    })
    .then (doc => {
      //return to a page
      res.redirect('/settings')
    })
    .catch (err=> {res.stats(500).json(err)})
}
