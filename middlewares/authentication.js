const jwt = require("jsonwebtoken");

const variables = require("../bin/configuration/variables");
const usuario = require("../models/user-model");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const [token] = authHeader.split(" ");

  if (token) {
    try {
      const decoded = await jwt.verify(token, variables.Security.secretKey);

      req.usuarioLogado = decoded;

      // eslint-disable-next-line no-underscore-dangle
      const userExiste = await usuario.findById(req.usuarioLogado.user._id);

      if (!userExiste) {
        res.status(401).send({ message: "Usuário não existe" });

        return;
      }

      next();
    } catch (e) {
      res.status(401).send({ message: "Token inválido" });
    }
  } else {
    res.status(401).send({ message: "Token inválido" });
  }
};
