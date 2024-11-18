const UserModel = require("../models/UserModel");
const Jwt = require("../middlewares/Jwt.js");

class UserController {
  async create(req, res) {
    async function getNextId(req, res) {
      let response = await UserModel.findOne()
        .select("id")
        .sort({ id: "descending" })
        .limit(1);
      let id = 1;
      if (response != null) {
        id = Number.parseInt(response.id) + 1;
      }

      return id;
    }
    const nextId = await getNextId(req, res);
    req.body.id = nextId;
    const user = new UserModel(req.body);
    await user
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async getAll(req, res) {
    await UserModel.find()
      .sort("id")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async get(req, res) {
    await UserModel.findOne({ id: req.params.id })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async update(req, res) {
    await UserModel.findOneAndUpdate(
      { id: Number.parseInt(req.params.id) },
      req.body,
      { new: true }
    )
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async delete(req, res) {
    await UserModel.findOneAndDelete({ id: req.params.id })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async login(req, res) {
    try {
      const user = await UserModel.findOne({
        name: req.params.name,
        password: req.params.password,
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const token = await Jwt.generateJWT(user.id);

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: "Erro no servidor", error });
    }
  }

  async logout(req, res) {
    Jwt.disableJWT(req.params.token)
      .then((response) => {
        return res.status(200);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
}

module.exports = new UserController();
