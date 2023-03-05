const express = require("express");
const router = express.Router();
const User = require("../../models/User.models");
const jwt = require("jsonwebtoken");
const {encryptData} = require("../../auth/encryption/asymEncryption");

router.post("/createUser", async (req, res) => {
    try {
        res.set("Access-Control-Allow-Origin", "*");
        let user = await User.findOne({where: {email: req.body.email}});
        if (user) {
            return res.status(400).send("User already registered.");
        }
        let hashedData = await encryptData(req.body.password, req.body);
        let newUser = await User.create({
            email: req.body.email,
            password: hashedData.toString(),
            userName: req.body.userName
        });
        console.log("User registered.")
        res.status(201).json({status: "User registered successfully."});
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json({status: "Error:", error})
    }
});

router.post("/login", async (req, res) => {
    try {
        let token;
        let user = await User.findOne({where: {email: req.body.email}});
        if (!user) throw "Invalid user.";
        let hashedData = await encryptData(req.body.password, req.body);
        if (hashedData === user.password) {
            token = jwt.sign({
                email: req.body.email,
                uuid: user.uuid,
                userName: user.userName
            }, process.env.TOKENKEY);
            console.log("Logged in.")
            console.log("User token: ", token)
            res.status(200).json({status: "Login successfully", token});
        } else {
            throw "Incorrect password";
        }
    } catch (error) {
        console.log("----------------------")
        console.log("Error: ", error)
        res.status(400).json({status: "Error: Invalid input.", error: error});
    }
});


module.exports = router;
