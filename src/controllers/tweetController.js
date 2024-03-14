const fs = require("fs");
const path = require("path");

const pathToData = path.join(__dirname, "..", "..", "assets", "data.json");

const data = fs.existsSync(pathToData)
  ? require("../../assets/data.json")
  : require("../../assets/initial-data.json");

const tweets = data.tweets;

/*
--------------------------
Retrieve all tweets
--------------------------
*/
async function getAllTweets(req, res) {
  const page = req.query.page || 1;
  const tweetPerPage = req.query.tweetPerPage || 40;
  const startIndex = (page - 1) * tweetPerPage;
  const endIndex = page * tweetPerPage;

  try {
    // Tri des tweets du plus récent au plus ancien
    const sortedTweets = tweets.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    // return res.send(sortedTweets);
    const tweetDisplayed = sortedTweets.slice(startIndex, endIndex);
    return res.json({
      totalPages: Math.ceil(sortedTweets.length / tweetPerPage),
      currentPage: page,
      tweetPerPage: tweetPerPage,
      totalTweets: sortedTweets.length,
      tweets: tweetDisplayed,
    });
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
  req.body.text = req.body.text.trim();

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
