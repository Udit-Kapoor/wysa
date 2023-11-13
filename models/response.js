const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  user_id : mongoose.Schema.Types.ObjectId,
  question_id : mongoose.Schema.Types.ObjectId,
  answer: {
      type: String,
      trim: true,
      required: [true, "Answer is reqd"],
    }
});


const Response = mongoose.model("Response", responseSchema);

module.exports = Response;