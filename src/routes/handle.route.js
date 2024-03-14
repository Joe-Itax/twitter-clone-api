const express = require("express");
const handleRouter = express.Router();
const {
  getDetailsOfAUser,
  getTweetsOfOneUser,
  getTweetsOfOneUserWithMedia,
} = require("../controllers/handleController");

//Get tweets of one user
handleRouter.get("/", getDetailsOfAUser);
handleRouter.get("/tweets", getTweetsOfOneUser);
handleRouter.get("/media", getTweetsOfOneUserWithMedia);

module.exports = handleRouter;
