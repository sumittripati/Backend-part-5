let express = require('express');
const  {Home, register, login, contact, logout}  = require('../controllers/auth-controller');
const authenticateUser = require('../middleware/authMiddleware');
const validator = require('../middleware/validate-middleware');
const registerSchema = require('../validators/auth-validator');
const router = express.Router();

router.route("/").get(Home)
router.route("/register").post(validator(registerSchema), register)
router.route("/login").post(login)
router.route("/contact").post(authenticateUser, contact);
router.route("/logout").get(logout)

module.exports = router;