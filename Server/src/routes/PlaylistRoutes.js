const express = require("express");
const router = express.Router();
const PlaylistController = require("../controllers/PessoaController");
const PlaylistValidation = require("../middlewares/PlaylistValidation");

router.post("/", PlaylistValidation, PlaylistController.create);
router.put("/:id", PlaylistValidation, PlaylistController.update);
router.delete("/:id", PlaylistController.delete);
router.get("/:id", PlaylistController.get);
router.get("/filter/getAll", PlaylistController.getAll);

module.exports = router;
