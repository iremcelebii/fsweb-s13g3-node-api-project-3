const express = require("express");

const server = express();

const { logger } = require("./middleware/middleware");
const usersRouter = require("./users/users-router");

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.use("/api/users", logger, usersRouter);
server.get("/merhaba", (req, res) => {
  console.log(req.url);
  res.json(process.env.MERHABA || "Merhaba...");
});

server.use((req, res, next) => {
  res.status(404).send("Aradığınız adres bulunamadı");
});

server.use((err, req, res, next) => {
  res.status(500).json({ message: "işlem yapılamadıııı", error: err });
});
module.exports = server;
