let express = require('express');
const  {Home, register, login, contact, logout, user}  = require('../controllers/auth-controller');
const authenticateUser = require('../middleware/authMiddleware');
const validator = require('../middleware/validate-middleware');
const {registerSchema, loginSchema} = require('../validators/auth-validator');
const router = express.Router();

router.route("/").get(Home)
router.route("/register").post(validator(registerSchema),register)
router.route("/login").post(login)
router.route("/contact").post(validator(loginSchema),authenticateUser,contact);
router.route("/logout").get(logout)
router.route("/user").get(authenticateUser, user);


module.exports = router;