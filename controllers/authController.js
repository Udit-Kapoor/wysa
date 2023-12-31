const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user");
// utils
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // for https only
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {

  try {
      const newUser = await User.create({
        ...req.body,
      });

      createAndSendToken(newUser, 201, res);
      
  } catch (error) {
      return next(new AppError(error.details[0].message, 400));
  }

  
});

exports.login = catchAsync(async (req, res, next) => {

  try {
    const { nickname, password } = req.body;
    // 1) check if email and password exists
    if (!nickname || !password) {
      next(new AppError("Please provide name and password", 400));
    }

    // 2) check if user exists and password is correct
    const user = await User.findOne({ nickname }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect name or password", 401));
    }

    // 3) if everything ok , send token to client
    createAndSendToken(user, 200, res);
  } catch (error) {
      return next(new AppError(error.details[0].message, 400));
  }

});

//LOGIC FOR PROTECTED ROUTES

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it exists
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The token belonging to this user no longer exists", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
});

