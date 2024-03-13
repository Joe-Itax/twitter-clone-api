const express = require("express");
const tweetRouter = express.Router();

const {
  getAllTweets,
  createTweets,
} = require("../controllers/tweetController");

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

/*
--------------------------
Middleware to add a new tweet to data.json file when posting to /tweets
--------------------------
*/
const fs = require("fs");
const path = require("path");
const pathToDataJson = path.join(__dirname, "..", "..", "assets", "data.json");
//console.log(fs.existsSync(pathToDataJson));
function addNewTweet(req, res, next) {
  fs.readFile(pathToDataJson, "utf-8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier JSON : ", err);
      return;
    }

    const jsonData = JSON.parse(data);
    const tweets = jsonData.tweets;
    //◊// Ajouter le nouveau tweet à la liste des tweets
    req.body.text = req.body.text.trim();
    tweets.push(req.body);

    // Réécrire le fichier JSON avec le nouveau tweet ajouté
    fs.writeFile(pathToDataJson, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier JSON : ", err);
        return;
      }
      console.log("Nouveau tweet ajouté avec succès !");
      next();
    });
  });
}

//Get all tweets
tweetRouter.get("/", getAllTweets);

//Create new tweet
tweetRouter.post("/", isAValidTweet, addNewTweet, createTweets);

module.exports = tweetRouter;
