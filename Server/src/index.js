const express = require("express");
const cors = require("cors");
const server = express();
const UserRoutes = require("./routes/UserRoutes");

server.use(express.json());
server.use(cors());

server.use("/user", UserRoutes);

server.get("/teste", (req, res) => {
  res.send("<h1> Servidor Operante </h1>");
});

server.listen(3000, () => {
  console.log("Servidor Online");
});
