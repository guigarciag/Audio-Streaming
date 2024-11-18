const PlaylistModel = require("../models/PlaylistModel");
const SongModel = require("../models/SongModel");
const Jwt = require("../middlewares/Jwt.js");
const UserModel = require("../models/UserModel");

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
    const playlist = new PlaylistModel(req.body);
    await playlist
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async getAll(req, res) {
    try {
      // Buscando todas as playlists e ordenando por ID
      const playlists = await PlaylistModel.find().sort("id");

      // Criando um array para armazenar as playlists com o nome do dono
      const playlistsWithOwner = [];

      for (let playlist of playlists) {
        // Criando um objeto com as informações da playlist
        const playlistData = {
          id: playlist.id,
          name: playlist.name,
          background: playlist.background,
          songs: playlist.songs,
          owner: null, // Inicializa o campo owner como null
        };

        // Buscando o nome do dono usando o ID do owner
        try {
          const owner = await UserModel.findOne({ id: playlist.owner });
          playlistData.owner = owner ? owner.name : null; // Se o owner existir, adiciona o nome
        } catch (error) {
          // Se não encontrar o dono ou houver erro, o campo owner permanece null
          console.error("Erro ao buscar o owner:", error);
        }

        // Adiciona a playlist com o nome do dono ao array
        playlistsWithOwner.push(playlistData);
      }

      // Retorna a resposta com todas as playlists, agora com o nome do owner
      return res.status(200).json(playlistsWithOwner);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar playlists", error: error.message });
    }
  }

  async get(req, res) {
    await PlaylistModel.findOne({ id: req.params.id })
      .then((response) => {
        //const result = response["id"];
        const result = {
          id: response.id,
          owner: null,
          name: response.name,
          background: response.background,
          songs: response.songs,
        };
        UserModel.findOne({ id: response.owner })
          .then((response) => {
            result["owner"] = response.name;
            return res.status(200).json(result);
          })
          .catch((error) => {
            return res.status(500).json(error);
          });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async getAllSongs(req, res) {
    await PlaylistModel.findOne({ id: req.params.id })
      .then((response) => {
        console.log(response.songs);
        SongModel.find({
          id: { $in: response.songs },
        }).then((response) => {
          return res.status(200).json(response);
        });
      })
      .catch((error) => {
        return res.status(500).json(error);
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
