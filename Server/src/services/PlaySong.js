const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

function PlaySong() {
  const statSync = fs.statSync;
  const createReadStream = fs.createReadStream;

  const app = express();
  const PORT = 4000;

  app.use(cors());

  const ASSETS_PATH = "./assets/songs/";

  app.get("/audio/:path", (req, res) => {
    const filePath = path.join(ASSETS_PATH, req.params.path);
    const CHUNK_SIZE = 500000 * 1e3;

    const range = req.headers.range || "0";
    const audioSize = statSync(filePath).size;

    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, audioSize - 1);
    const contentLength = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${audioSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "audio/mpeg",
      "Transfer-Encoding": "chunked",
    };

    res.writeHead(206, headers);

    const stream = createReadStream(filePath, { start, end });
    stream.pipe(res);
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = PlaySong;
