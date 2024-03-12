const express = require("express");

const {
  getAllTweets,
  createTweets,
} = require("../controllers/tweetController");

const tweetRouter = express.Router();

//Get all tweets
tweetRouter.get("/", getAllTweets);

//Create new tweet
tweetRouter.post("/", createTweets);

module.exports = tweetRouter;
