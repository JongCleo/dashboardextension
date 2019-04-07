let express = require('express');
let router = express.Router();

let user_controller = require('../controllers/user.controller');
let productivity_controller = require('../controllers/productivity.controller');
let sleep_controller = require('../controllers/sleep.controller');
let settings_controller = require('../controllers/settings.controller');

//////////////////////////////////////////////// Settings

router.get('/settings', settings_controller.show_page);

//////////////////////////////////////////////// USER
// CREATE user on new app signup
router.post('/api/user/create', user_controller.user_create);

// GET user settings
router.get('/api/user/settings', user_controller.user_settings_get);

// GET all dashboard Data
router.get('/api/user/alldata', user_controller.dashboard_data_get);

// DELETE a dashboard
router.delete('/api/user/dashboard/delete', user_controller.dashboard_delete);

//////////////////////////////////////////////// PRODUCTIVITY

// CREATE productivity dash data
router.get('/auth/productivity/authorize', productivity_controller.productivity_create);

//////////////////////////////////////////////// SLEEP
// GET sleep auth page
router.get('/auth/fitbit/authorize', sleep_controller.fitbit_authorize);

// GET sleep registration complete, import data
router.get('/fitbit/callback', sleep_controller.fitbit_callback);

module.exports = router;
