const express = require("express");

const {createUser, loginUser, logoutUser, forgotPassword, resetpassword, updatePassword,getUserDetails, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser } = require("../controllers/userController");

const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetpassword);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/me/update").put(isAuthenticated, updateProfile);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticated, authorizeRoles("admin"), getSingleUser).put(isAuthenticated, authorizeRoles("admin"), updateRole).delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = router;    