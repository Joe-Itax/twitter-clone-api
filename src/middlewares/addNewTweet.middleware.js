/*
--------------------------
Middleware to add a new tweet 
to data.json file when 
posting to /tweets
--------------------------
*/
const fs = require("fs");
const path = require("path");
const pathToDataJson = path.join(__dirname, "..", "..", "assets", "data.json");
//console.log(fs.existsSync(pathToDataJson));

const addNewTweet = (req, res, next) => {
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
};

module.exports = { addNewTweet };
