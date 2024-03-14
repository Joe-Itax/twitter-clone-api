const data = require("../../assets/data.json");
const users = data.users;
const tweets = data.tweets;

/**/
function findUserIdByHandle(users, targetHandle) {
  let result = { userId: null, infoUser: null };
  users.forEach((user) => {
    if (user.handle === targetHandle) {
      result.userId = user.id;
      result.infoUser = user;
    }
  });
  return result;
}

/*
--------------------------
returns all infos of a user 
identified by their handle
--------------------------
/:handle
*/
async function getDetailsOfAUser(req, res) {
  let handle = req.baseUrl;
  handle = handle.slice(7, handle.length);
  //console.log(res);
  console.log(req.params);
  console.log("reqdd: ", handle);
  let targetHandle = `@${handle}`;

  let { userId, infoUser } = findUserIdByHandle(users, targetHandle);

  try {
    if (userId !== null) {
      /*return res.send(
        `L'ID de l'utilisateur avec le handle ${targetHandle} est: ${userId}`
      );*/
      return res.json(infoUser);
    } else {
      return res
        .status(404)
        .send(
          `Aucun utilisateur avec le handle ${targetHandle} n'a été trouvé.`
        );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/*
--------------------------
returns all tweets from a user 
identified by their handle
--------------------------
/:handle/tweets
*/
async function getTweetsOfOneUser(req, res) {
  let handle = req.baseUrl;

  handle = handle.slice(7, handle.length);
  let targetHandle = `@${handle}`;

  let { userId, infoUser } = findUserIdByHandle(users, targetHandle);
  try {
    if (userId !== null) {
      return res.send(`Les tweets de l'utilisateur "${handle}"`);
    } else {
      return res
        .status(404)
        .send(
          `Aucun utilisateur avec le handle ${targetHandle} n'a été trouvé.`
        );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getDetailsOfAUser,
  getTweetsOfOneUser,
};
