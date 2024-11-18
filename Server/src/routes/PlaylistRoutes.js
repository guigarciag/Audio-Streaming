const express = require("express");
const router = express.Router();
const PlaylistController = require("../controllers/PlaylistController");
const PlaylistValidation = require("../middlewares/PlaylistValidation");

router.get("/:id", PlaylistController.get);
router.get("/filter/getAll", PlaylistController.getAll);
router.get("/getAllSongs/:id", PlaylistController.getAllSongs);
router.post("/", PlaylistValidation, PlaylistController.create);
router.put("/:id", PlaylistValidation, PlaylistController.update);
router.delete("/:id", PlaylistController.delete);
router.put("/:playlistId/:songId", PlaylistController.addSongToPlaylist);
router.delete(
  "/:playlistId/:songId",
  PlaylistController.removeSongFromPlaylist
);

module.exports = router;
