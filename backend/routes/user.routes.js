let express = require('express');
let router = express.Router();

let user_controller = require('../controllers/user.controller');
let productivity_controller = require('../controllers/productivity.controller');

// CREATE user on new app signup
router.post('/api/user/create', user_controller.user_create);

// GET user settings
router.get('/api/user/settings/', user_controller.user_settings_get);

// GET all dashboard Data
router.get('/api/user/alldata', user_controller.dashboard_data_get);

// CREATE productivity dash data
router.post('/api/user/productivity/create', productivity_controller.productivity_create);

module.exports = router;
