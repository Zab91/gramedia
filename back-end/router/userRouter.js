const router = require("express").Router();
const { user } = require("../controller");

router.post("/register", user.register);
router.get("/verification", user.verification);
router.post("/login", user.login);
router.get("/keeplogin", user.keepLogin);

module.exports = router;
