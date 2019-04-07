config = require('../config.json');
const FitbitApiClient = require("fitbit-node");
const fitclient = new FitbitApiClient({
	clientId: config.FB_CLIENT_ID,
	clientSecret: config.FB_CLIENT_SECRET,
	apiVersion: '2.0' // 1.2 is the default
});

exports.fitbit_authorize = function(req, res) {
  res.redirect(fitclient.getAuthorizeUrl('profile sleep', 'http://localhost:4000/fitbit/callback'));
}

exports.fitbit_callback = function(req, res) {
  // exchange the authorization code we just received for an access token
	console.log(req.session.email)
	fitclient.getAccessToken(req.query.code, 'http://localhost:4000/fitbit/callback').then(result => {
		// use the access token to fetch the user's profile information
		fitclient.get("/profile.json", result.access_token).then(results => {
			res.send(results[0]);
		}).catch(err => {
			res.status(err.status).send(err);
		});
	}).catch(err => {
		res.status(err.status).send(err);
	});
}
