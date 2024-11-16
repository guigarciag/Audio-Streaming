const PlaylistModel = require("../models/PlaylistModel");
const Jwt = require("../middlewares/Jwt.js");

class PlaylistController {
  async create(req, res) {
    async function getNextId(req, res) {
      let response = await PlaylistModel.findOne()
        .select("id")
        .sort({ id: "descending" })
        .limit(1);
      let id = 1;
      if (response != null) {
        id = Number.parseInt(response.id) + 1;
      }

      return id;
    }
    // req = request  e res = response
    const nextId = await getNextId(req, res);
    req.body.id = nextId;
    const user = new PlaylistModel(req.body);
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
    await PlaylistModel.find()
      .sort("id")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async get(req, res) {
    await PlaylistModel.findOne({ id: req.params.id })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async update(req, res) {
    await PlaylistModel.findOneAndUpdate(
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
    await PlaylistModel.findOneAndDelete({ id: req.params.id })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
}

module.exports = new PlaylistController();
