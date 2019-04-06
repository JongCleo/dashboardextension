let express = require('express');
let router = express.Router();
let auth_controller = require('../controllers/auth.controller');

router.get('/auth/fitbit/authorize', auth_controller.fitbit_authorize);

router.get('/fitbit/callback', auth_controller.fitbit_callback);

module.exports = router;

// module.exports = function(app, passport) {
//   app.get('/auth/fitbit/authorize', function(req, res) {
//     passport.authenticate('fitbit', {
//       successRedirect: '/auth/fitbit/success',
//       failureRedirect: '/auth/fitbit/failure'
//     })
//   })
//   app.get('/auth/fitbit/callback', function(req, res) {
//     passport.authenticate('fitbit', {
//       successRedirect: '/auth/fitbit/success',
//       failureRedirect: '/auth/fitbit/failure'
//     })
//   })
//
//   app.get('/auth/fitbit/success', function(req, res){
//     res.send(req.user);
//   })
//   app.get('/auth/fitbit/failure', function(req, res){
//     res.send("TBD");
//   })
// }
