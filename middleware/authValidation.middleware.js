const {verifyToken} = require("../auth/jwt");

const authMiddleware = async (req, res, next) => {
    console.log("token", req.headers["token"])
    try {
        const payload = await verifyToken(req.headers["token"]);
        console.log(payload);
        req.userData = payload.id;
        next();
    } catch (err) {
        console.log("error: ", err)
        res.status(401).json(err);
    }
};

module.exports = {authMiddleware}