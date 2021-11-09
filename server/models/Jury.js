const mongoose = require("mongoose");

const JurySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Jury = mongoose.model("Jury", JurySchema);

module.exports = Jury;
