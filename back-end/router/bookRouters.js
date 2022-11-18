const router = require("express").Router();

const { book } = require("../controller");

router.get("/all", book.all);

// Admin
router.post("/add", book.add);

// Filter
router.get("/search", book.search);
router.get("/filter", book.filter);

module.exports = router;
