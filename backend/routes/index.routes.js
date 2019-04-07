let express = require('express');
let router = express.Router();

let user_controller = require('../controllers/user.controller');
let productivity_controller = require('../controllers/productivity.controller');
let sleep_controller = require('../controllers/sleep.controller');
let habits_controller = require('../controllers/habits.controller');


//////////////////////////////////////////////// USER
// CREATE user on new app signup
router.post('/api/user/create', user_controller.user_create);

// GET all dashboard Data
router.get('/api/user/alldata', user_controller.dashboard_data_get);

router.get('/settings', user_controller.show_page);

//////////////////////////////////////////////// PRODUCTIVITY

// CREATE productivity dash data
router.get('/auth/productivity/authorize', productivity_controller.productivity_create);

// DELETE productivity dash data
router.get('/productivity/delete', productivity_controller.productivity_delete);

//////////////////////////////////////////////// SLEEP
// GET sleep auth page
router.get('/auth/fitbit/authorize', sleep_controller.fitbit_authorize);

// GET sleep registration complete, import data
router.get('/fitbit/callback', sleep_controller.fitbit_callback);

// DELETE sleep dash data
router.get('/fitbit/delete', sleep_controller.fitbit_delete);

//////////////////////////////////////////////// HABITS
// CREATE Habits dash data
router.get('/auth/habits/authorize', habits_controller.habits_create);

// DELETE Habits dash data
router.get('/habits/delete', habits_controller.habits_delete);

module.exports = router;
