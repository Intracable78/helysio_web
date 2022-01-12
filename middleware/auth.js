const jwt = require("jsonwebtoken");
const config = process.env;


const verifyToken = (req, res, next) => {

    var authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);

        const decode = jwt.decode(token);

        req.verifyUserExist = decoded;

    } catch (err) {
        res.status(401).send('Invalid token')
    }
    return next();
}

module.exports = verifyToken;