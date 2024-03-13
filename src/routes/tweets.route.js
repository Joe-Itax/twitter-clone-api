const express = require("express");

const {
  getAllTweets,
  createTweets,
} = require("../controllers/tweetController");

const tweetRouter = express.Router();

/*
--------------------------
Middleware which will check if during a POST the tweet is not empty 
and that it has a maximum of 180 characters
--------------------------
*/
function isAValidTweet(req, res, next) {
  if (
    !req.body.text ||
    req.body.text.length === 0 ||
    req.body.text.length > 180 ||
    !/\S/.test(req.body.text)
  ) {
    return res
      .status(400)
      .send(
        `Veuillez à ce que le corps du tweet ne sois pas vide et qu'il ait au max 180 caractères`
      );
  }
  next();
}

//Get all tweets
tweetRouter.get("/", getAllTweets);

//Create new tweet
tweetRouter.post("/", isAValidTweet, createTweets);

module.exports = tweetRouter;
