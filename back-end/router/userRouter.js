const router = require("express").Router();
const { user } = require("../controller");

router.post("/register", user.register);
router.get("/verification", user.verification);
router.get("/login", user.login);

module.exports = router;
