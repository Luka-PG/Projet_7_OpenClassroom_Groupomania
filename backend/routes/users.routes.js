/* Import des modules necessaires */
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/users.controllers");

const GuardAuth = require("../middleware/GuardAuth");

// route for login and signup : user.
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", GuardAuth, userCtrl.getAllUser);

module.exports = router;