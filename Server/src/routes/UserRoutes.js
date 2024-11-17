const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const UserValidation = require("../middlewares/UserValidation");
const Jwt = require("../middlewares/Jwt");

router.get("/:id", Jwt.verifyJWT, UserController.get);
router.get("/filter/getAll", Jwt.verifyJWT, UserController.getAll);
router.post("/", UserValidation, UserController.create);
router.post("/login/:name/:password", UserController.login);
router.post("/logout/:token", Jwt.verifyJWT, UserController.logout);
router.put("/:id", [UserValidation, Jwt.verifyJWT], UserController.update);
router.delete("/:id", Jwt.verifyJWT, UserController.delete);

module.exports = router;
