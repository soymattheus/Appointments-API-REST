// src/middleware/log.middleware.js
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { Log } = require("../models");

module.exports = (options = {}) => {
  return (req, res, next) => {
    res.on("finish", async () => {
      try {
        let userId = "SYSTEM"; // fallback para rotas não autenticadas

        const authHeader = req.headers.authorization;
        if (authHeader) {
          const [, token] = authHeader.split(" ");
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.idUser;
          } catch {
            // token inválido → mantém SYSTEM
          }
        }

        const activityType =
          options.activityType || `${req.method} ${req.originalUrl}`;

        const module =
          options.module || req.originalUrl.split("/")[1] || "unknown";

        const log = await Log.create({
          id_logs: uuidv4(),
          activity_type: activityType,
          module: module.substring(0, 15),
          created_at: new Date(),
          id_user: userId,
        });
      } catch (error) {
        console.error("Erro ao registrar log:", error.message);
      }
    });

    next();
  };
};
