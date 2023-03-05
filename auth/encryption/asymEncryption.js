/*
  --------------------------------------------------

  Steps to encrypt password:

    1. receive original pass.
    2. add user's "created date" before the original password.
    3. encrypt in "SHA256".
    4. receive back the password in HEX.

  --------------------------------------------------
*/

const {createHash} = require("node:crypto");
const User = require("../../models/User.models");


const encryptData = async (dataToEncrypt, userData) => {
    try {
        let user = await User.findOne({ where: { email: userData.email } });
        // let convertedPass = `${user ? user.createdAt : new Date()}-${dataToEncrypt}`;
        // let convertedPass2 = convertedPass.replace("GMT+0200 (Israel Standard Time)", "").trim();
        const hash = createHash("sha256");
        // return hash.update(convertedPass2).digest("hex");
        return hash.update(dataToEncrypt).digest("hex");
    } catch (error) {
        console.log("error: ", error);
        return error;
    }
};

module.exports = { encryptData };
