const Question = require("../models/question");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.getQuestions = catchAsync(async (req, res, next) => {
    try {
      const questions = await Question.find();
      res.json(questions);
    } catch (error) {
      return next(new AppError(error.details[0].message, 400));
    }
});
