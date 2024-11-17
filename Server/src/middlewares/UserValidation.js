const UserModel = require("../models/UserModel");

async function UserValidation(req, res, next) {
  const { id, name, password, premium } = req.body;

  let alteracaoRegistro = req.params.id != null;

  if (!name) return res.status(400).json({ erro: "Informe o name" });

  if (!password) return res.status(400).json({ erro: "Informe o password" });

  if (premium === "")
    return res.status(400).json({ erro: "Informe se o usuário é premium" });

  if (alteracaoRegistro) {
    if (id && Number.parseInt(req.params.id) != Number.parseInt(id))
      return res.status(400).json({
        erro: "Id informado no parâmetro está diferente do id informado no Json",
      });

    let qtde = await UserModel.countDocuments({ id: req.params.id });
    let existe = qtde >= 1;

    if (!existe)
      return res
        .status(400)
        .json({ erro: "Não há registro para o Id informado" });
  }

  return next();
}

module.exports = UserValidation;
