const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 3000;

const corsOptions = {
  origin: `http://localhost:5173`,
};

// Config
app.use(express.json());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.get(`/`, (req, res) => {
  return res.send("La racine de l'app");
});

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
/*
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../assets/data.json");

fs.appendFile("../assets/data.json", "../assets/initial-data.json", (err) => {
  if (err) throw err;

  console.log("fichier créer!");
});

fs.writeFile(filePath, "", (err) => {
  if (err) throw err;
  console.log("fichier créer ici: ", filePath);
});*/

/*
fs.unlink("nouveauFichier.txt", (err) => {
  if (err) throw err;
  console.log("nouveauFichier.txt was deleted");
});


fs.copyFile("../assets/initial-data.json", "../assets/data.json", (err) => {
  if (err) throw err;
  console.log("Fichier copié");
});
*/
