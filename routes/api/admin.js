const express = require("express");
const router = express.Router();
const User = require("../../models/User.models");


router.get("/getAllUsers", async (req, res) => {
    try {
        const users = await User.findAll();
        console.log(users)
        if (!users) throw "no users in database!";
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
});

router.get("/getUserById", async (req, res) => {
    try {
        const user = await User.findOne({id: req.body});
        if (!user) throw "user in does not exist!";
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

router.use("/", (req, res) =>
    res.send("hello world!")
);

module.exports = router;
