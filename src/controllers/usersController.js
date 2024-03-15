const fs = require("fs");
const path = require("path");

const pathToData = path.join(__dirname, "..", "..", "assets", "data.json");

const data = fs.existsSync(pathToData)
  ? require("../../assets/data.json")
  : require("../../assets/initial-data.json");

const users = data.users;

/*
--------------------------
Retrieve all Users
--------------------------
*/
async function getAllUsers(req, res) {
  try {
    return res.send(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllUsers,
};
