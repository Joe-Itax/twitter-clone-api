const express = require("express");
const handleRouter = express.Router();
const {
  getDetailsOfAUser,
  getTweetsOfOneUser,
} = require("../controllers/handleController");

//Get tweets of one user
handleRouter.get("/", getDetailsOfAUser);
handleRouter.get("/tweets", getTweetsOfOneUser);

module.exports = handleRouter;
