const router = require("express").Router();

const { book } = require("../controller");

router.get("/all", book.all);

// Admin
router.post("/add", book.add);

// Filter
router.get("/filter", book.filter);
router.get("/search", book.search);

module.exports = router;
