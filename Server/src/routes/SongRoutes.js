const express = require("express");
const router = express.Router();
const SongController = require("../controllers/SongController");
const SongValidation = require("../middlewares/SongValidation");

router.get("/:id", SongController.get);
router.get("/filter/getAll", SongController.getAll);
router.post("/", SongValidation, SongController.create);
router.put("/:id", SongValidation, SongController.update);
router.delete(":id", SongController.delete);

module.exports = router;
