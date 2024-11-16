const UserModel = require("../models/UserModel");

async function UserValidation(req, res, next) {
  return next();
}

module.exports = UserValidation;
