let express = require('express');
const  {Home, register, login, contact, logout}  = require('../controllers/auth-controller');
const router = express.Router();

router.route("/").get(Home)
router.route("/register").post(register)
router.route("/login").get(login)
router.route("/contact").get(contact)
router.route("/logout").get(logout)

module.exports = router;