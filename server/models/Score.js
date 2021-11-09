const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  jury: { type: mongoose.Schema.Types.ObjectId, ref: "Jury" },
});

const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
