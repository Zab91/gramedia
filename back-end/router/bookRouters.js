const router = require("express").Router();

const { book } = require("../controller");

router.get("/all", book.all)
router.get("/filter", book.filter);
router.get("/search", book.search);
router.get("/all", book.all);

// Admin
router.post("/add", book.add);

// Filter
router.get("/filter", book.filter);
router.get("/search", book.search);
router.get("/detail/:id", book.detail);

module.exports = router;
