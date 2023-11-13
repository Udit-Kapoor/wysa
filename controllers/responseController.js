const Response = require("../models/response");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.submitAnswer = catchAsync(async (req, res, next) => {
  try {
    const { user_id, responses } = req.body;
    const userResponses = await Response.create(
      responses.map((response) => ({ user_id, ...response }))
    );
    //TODO : add logic to calculate sleep_efficiency
    //TODO : add validation logic so that answer must match options in question
    res.json({
      user_id,
      message: "Responses submitted successfully.",
      sleep_efficiency: 83,
    });
  } catch (error) {
    return next(new AppError(error.details[0].message, 400));
  }
});