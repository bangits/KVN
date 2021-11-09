const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Jury = require("./models/Jury");
const Player = require("./models/Player");
const Score = require("./models/Score");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ArmenMesropyan:Armen187@cluster0.ilkpf.mongodb.net/KVN",
  {
    useNewUrlParser: true,
  }
);

io.on("connection", (socket) => {
  socket.on("scoreUpdated", (data) => {
    socket.broadcast.emit("scoreUpdated", data);
  });
});

app.post("/juries", async (req, res) => {
  const jury = new Jury({
    name: req.body.name,
    password: req.body.password,
  });

  await jury.save();

  res.json({
    msg: "Success",
  });
});

app.get("/juries", async (req, res) => {
  Jury.find({}, (err, result) => {
    if (err) res.status(500).send(err);

    res.json({
      data: result,
    });
  });
});

app.post("/juries/login", async (req, res) => {
  Jury.findOne(
    { name: req.body.username, password: req.body.password },
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (!result) return res.status(404).send({});

      res.json({
        data: result,
      });
    }
  );
});

app.post("/players", async (req, res) => {
  const player = new Player({
    name: req.body.name,
    image: req.body.image,
  });

  await player.save();

  res.json({
    msg: "Success",
  });
});

app.get("/players", async (req, res) => {
  Player.find({}, (err, result) => {
    if (err) res.status(500).send(err);

    res.json({
      data: result,
    });
  });
});

app.post("/juries/scores", async (req, res) => {
  Score.findOne(
    { player: req.body.playerId, jury: req.body.juryId },
    async (err, latestScore) => {
      if (latestScore) {
        console.log(latestScore);
        latestScore.score = req.body.score;

        await latestScore.save();
      } else {
        const score = new Score({
          player: req.body.playerId,
          jury: req.body.juryId,
          score: req.body.score,
        });

        await score.save();
      }

      res.json({
        msg: "Success",
      });
    }
  );
});

app.get("/totals/:playerId", async (req, res) => {
  Score.find({ player: req.params.playerId }, (err, result) => {
    if (err) res.status(500).send(err);

    res.json({
      data: result.reduce((acc, r) => r.score + acc, 0),
    });
  }).populate(["player", "jury"]);
});

app.get("/totals", async (req, res) => {
  Player.find({}, (err, result) => {
    if (err) res.status(500).send(err);

    const players = [];

    result.map((player, index) => {
      Score.find({ player: player._id }, (err, playerScores) => {
        if (playerScores[0]) {
          players.push({
            totalScore: playerScores.reduce(
              (acc, score) => acc + score.score,
              0
            ),
            playerInfo: playerScores[0].player,
          });
        }

        if (index === result.length - 1) {
          res.json({
            data: players,
          });
        }
      }).populate("player");
    });
  });
});

server.listen(3001, () => {
  console.log("Server listening at port 3001");
});
