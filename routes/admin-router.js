let express = require('express');
let router = express.Router();
let {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById} = require('../controllers/admin-controller');
let authMiddleware = require('../middleware/authMiddleware');
let adminMiddleware = require('../middleware/admin-middleware');

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers)

router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById)

router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, updateUserById)

router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, deleteUserById);

router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, deleteContactById);

router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts)

module.exports = router;