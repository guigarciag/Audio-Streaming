const express = require("express");
const cors = require("cors");
const server = express();
const UserRoutes = require("./routes/UserRoutes");
const PlaylistRoutes = require("./routes/PlaylistRoutes");
const SongRoutes = require("./routes/SongRoutes");
const PlaySong = require("./services/PlaySong");

PlaySong();
server.use(express.json());
server.use(cors());

server.use("/user", UserRoutes);
server.use("/song", SongRoutes);
server.use("/playlist", PlaylistRoutes);

server.get("/teste", (req, res) => {
  res.send("<h1> Servidor Operante </h1>");
});

server.listen(3000, () => {
  console.log("Servidor Online");
});
