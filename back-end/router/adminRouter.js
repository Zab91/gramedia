const router = require("express").Router();
const { admin } = require("../controller");

router.post("/adminLogin", admin.loginAdmin);
router.post("/adminRegister", admin.registerAdmin);
router.get("/adminKeepLogin", admin.adminKeepLogin);

module.exports = router;
