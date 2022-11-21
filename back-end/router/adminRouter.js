const router = require("express").Router();
const { admin } = require("../controller");

router.post("/adminLogin", admin.loginAdmin);
router.post("/adminRegister", admin.registerAdmin);

module.exports = router;
