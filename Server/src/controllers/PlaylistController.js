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
      const playlists = await PlaylistModel.find().sort("id");

      const playlistsWithOwner = [];

      for (let playlist of playlists) {
        const playlistData = {
          id: playlist.id,
          name: playlist.name,
          background: playlist.background,
          songs: playlist.songs,
          owner: null,
        };

        try {
          const owner = await UserModel.findOne({ id: playlist.owner });
          playlistData.owner = owner ? owner.name : null;
        } catch (error) {
          console.error("Erro ao buscar o owner:", error);
        }

        playlistsWithOwner.push(playlistData);
      }

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
    try {
      const playlist = await PlaylistModel.findOne({ id: req.params.id });

      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      const owner = await UserModel.findOne({ id: playlist.owner });

      const songs = await SongModel.find({
        id: { $in: playlist.songs },
      });

      return res.status(200).json({
        playlist: {
          id: playlist.id,
          name: playlist.name,
          owner: owner ? owner.name : null,
          background: playlist.background,
          songs,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    const playlistId = Number.parseInt(req.params.id);

    try {
      const updatedPlaylist = await PlaylistModel.findOneAndUpdate(
        { id: playlistId },
        req.body,
        { new: true }
      );

      if (!updatedPlaylist) {
        return res.status(404).json({ message: "Playlist não encontrada" });
      }

      const songs = await SongModel.find({
        id: { $in: updatedPlaylist.songs },
      });

      const owner = await UserModel.findOne({ id: updatedPlaylist.owner });

      return res.status(200).json({
        playlist: {
          id: updatedPlaylist.id,
          name: updatedPlaylist.name,
          owner: owner ? owner.name : null,
          background: updatedPlaylist.background,
          songs,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar a playlist", error });
    }
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

  async removeSongFromPlaylist(req, res) {
    const playlistId = Number.parseInt(req.params.playlistId);
    const songId = Number.parseInt(req.params.songId);

    try {
      const updatedPlaylist = await PlaylistModel.findOneAndUpdate(
        { id: playlistId },
        { $pull: { songs: songId } },
        { new: true }
      );

      if (!updatedPlaylist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      const songs = await SongModel.find({
        id: { $in: updatedPlaylist.songs },
      });

      const owner = await UserModel.findOne({ id: updatedPlaylist.owner });

      return res.status(200).json({
        playlist: {
          id: updatedPlaylist.id,
          name: updatedPlaylist.name,
          owner: owner ? owner.name : null,
          background: updatedPlaylist.background,
          songs,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async addSongToPlaylist(req, res) {
    const playlistId = Number.parseInt(req.params.playlistId);
    const songId = Number.parseInt(req.params.songId);

    try {
      const updatedPlaylist = await PlaylistModel.findOneAndUpdate(
        { id: playlistId },
        { $addToSet: { songs: songId } },
        { new: true }
      );

      if (!updatedPlaylist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      const songs = await SongModel.find({
        id: { $in: updatedPlaylist.songs },
      });

      const owner = await UserModel.findOne({ id: updatedPlaylist.owner });

      return res.status(200).json({
        playlist: {
          id: updatedPlaylist.id,
          name: updatedPlaylist.name,
          owner: owner ? owner.name : null,
          background: updatedPlaylist.background,
          songs,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PlaylistController();
