const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const UserValidation = require("../middlewares/UserValidation");
const Jwt = require("../middlewares/Jwt");

router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
router.get("/:id", UserController.get);
router.get("/filter/getAll", UserController.getAll);
router.get("/login/:name/:password", UserController.login);
router.post("/login/logout/:token", UserController.logout);

module.exports = router;
