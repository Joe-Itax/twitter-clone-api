const express = require("express");
const userRouter = express.Router();

const { getAllUsers } = require("../controllers/usersController");

//Get all users
userRouter.get("/", getAllUsers);

//exports tweetRouter
module.exports = userRouter;
