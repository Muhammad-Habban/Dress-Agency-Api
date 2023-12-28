const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const User = require("../models/User");

// Get All Users
const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ total: user.length, user });
};

const updaterUserRole = async(req, res)=>{
  const {name} = req.body;
  const user = await User.findOne({name});
  user.role = "admin";
  await user.save();
  return res.status(StatusCodes.OK).json({message: "Role Successfully Updated"});
}
// Show User
const showUser = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

module.exports = { getAllUsers, showUser, updaterUserRole };
