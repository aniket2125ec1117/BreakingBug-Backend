const jwt = require("jsonwebtoken");

const createNewToken = function(payload) {
    return jwt.sign({ userId: payload }, process.env.SECRET_KEY, { expiresIn: '10d' });
}

module.exports = {createNewToken};