const router = require("express").Router();

const { transaction } = require("../controller");

router.post("/add/:NIM", transaction.addLoan);
router.get("/all", transaction.allLoan);
router.get("/singular/:NIM", transaction.singularLoan);
router.get("/delete/:id", transaction.deleteLoan);

module.exports = router;
