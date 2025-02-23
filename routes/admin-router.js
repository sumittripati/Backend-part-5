let express = require('express');
let router = express.Router();
let getAllUsers = require('../controllers/admin-controller');

router.route("/users").get(getAllUsers)

module.exports = router;