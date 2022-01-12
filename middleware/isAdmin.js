const jwt = require("jsonwebtoken");
const config = process.env;


const isAdmin = (req, res, next) => {

    const token = req.body.token || req.headers["x-access-token"];

    if (!token) {
        res.status(401).send("A token is required for access to this page");
    }

    try {
        jwt.verify(token, config.TOKEN_KEY, (err, decodedData) => {
            if (err) {
                return res.status(401);
            }
            if (decodedData.id_rank === 1) {
                console.log('heure')
                return next();
            }
            else {
                return res.status(401).json('Acess denied')
            }
        });

    } catch (err) {
        res.status(401).send('Invalid token')
    }

}

module.exports = isAdmin;