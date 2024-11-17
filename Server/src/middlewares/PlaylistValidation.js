const PlaylistModel = require("../models/PlaylistModel");

async function PlaylistValidation(req, res, next) {
  const { id, name, owner, background, songs } = req.body;

  let alteracaoRegistro = req.params.id != null;

  if (!name) return res.status(400).json({ erro: "Informe o name" });

  if (!owner) return res.status(400).json({ erro: "Informe o singer" });

  if (!background)
    return res.status(400).json({ erro: "Informe a foto de background" });

  if (!songs)
    return res.status(400).json({ erro: "Informe o path do arquivo" });

  if (alteracaoRegistro) {
    if (id && Number.parseInt(req.params.id) != Number.parseInt(id))
      return res.status(400).json({
        erro: "Id informado no parâmetro está diferente do id informado no Json",
      });

    let qtde = await PlaylistModel.countDocuments({ id: req.params.id });
    let existe = qtde >= 1;

    if (!existe)
      return res
        .status(400)
        .json({ erro: "Não há registro para o Id informado" });
  }
  return next();
}

module.exports = PlaylistValidation;
