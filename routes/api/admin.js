const express = require("express");
const router = express.Router();

router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) throw "no users in database!";
    res.status(200).json(users);
  } catch (error) {
    debug(error);
  }
});

router.get("/getUserById", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.body });
    if (!user) throw "user in does not exist!";
    res.status(200).json(user);
  } catch (error) {
    debug(error);
  }
});

module.exports = router;
