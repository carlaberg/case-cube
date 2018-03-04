const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Please enter a case title."
  },
  caseHeroImg: String,
  casePics: String,
  description: {
    type: String,
    required: "Please fill in a case description"
  }
});

module.exports = mongoose.model("Case", caseSchema);
