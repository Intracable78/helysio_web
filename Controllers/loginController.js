const express = require('express');
const router = express.Router();
const db = require('../models/index');
const User = require("../models/account")(db.sequelize, db.Sequelize.DataTypes);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();



router.post('/', async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            res.status(400).send('All input is required');
        }

        const verifyUserExist = await User.findOne({
            where: {
                email: email
            }

        });

        if (verifyUserExist && (await bcrypt.compare(password, verifyUserExist.password))) {

            const token = jwt.sign(
                { user_id: verifyUserExist.user_id, id_rank: verifyUserExist.id_rank },
                process.env.TOKEN_KEY,
                { expiresIn: "24h" }
            );

            res.status(200).json({
                success: true,
                idToken: token,
                user_id: verifyUserExist.id,
                rank_id: verifyUserExist.id_rank
            });
        }

        else {
            res.status(400).send('Incorrect email or password');
        }
    } catch (err) {
        console.log(err);
    }

})



module.exports = router;