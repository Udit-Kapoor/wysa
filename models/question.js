const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question_text: {
      type: String,
      trim: true,
      required: [true, "Questons are reqd"],
    },
  options: {
      type: [String],
      required: [true, "Need atleast one option"],
    }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
