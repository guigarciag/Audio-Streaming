const jwt = require("jsonwebtoken");

const SECRET =
  "1a06538f102040deabef2491abcf42a7b604b557d98395a059697c5d7ba9afa8";
const blacklist = [];

class Jwt {
  async verifyJWT(req, res, next) {
    const token = req.headers["access-token"];
    const index = blacklist.findIndex((item) => item === token);

    if (index !== -1) {
      return res.status(401).end();
    }

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).end();
      }
      req.userId = decoded.userId;
      return next();
    });
  }

  async generateJWT(id) {
    const token = jwt.sign({ userId: id }, SECRET);
    return token;
  }

  async disableJWT(req, res) {
    blacklist.push(token);
    res.end();
  }
}

module.exports = new Jwt();
