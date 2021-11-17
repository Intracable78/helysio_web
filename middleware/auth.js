const jwt = require("jsonwebtoken");
const config = process.env;


const verifyToken = (req, res, next) => {

    const token = req.body.token || req.headers["x-access-token"];

    if(!token) {
        res.status(401).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.verifyUserExist = decoded;
    } catch (err) {
        res.status(401).send('Invalid token')
    }
    return next();
}

module.exports = verifyToken;