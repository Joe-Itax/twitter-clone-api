const data = require("../../assets/initial-data.json");
const tweets = data.tweets;

/*
--------------------------
Retrieve all tweets
--------------------------
*/
async function getAllTweets(req, res) {
  try {
    return res.send(tweets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/*
--------------------------
Create and save a new tweet
--------------------------
*/
async function createTweets(req, res) {
  const newTweet = req.body;

  try {
    tweets.push(newTweet);
    return res.status(201).send(tweets[tweets.length - 1]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllTweets,
  createTweets,
};
