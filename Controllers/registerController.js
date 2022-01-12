const express = require('express');
const router = express.Router();
const db = require('../models/index');
const User = require("../models/account")(db.sequelize, db.Sequelize.DataTypes);
const bcrypt = require('bcrypt');


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const saltRounds = 10;



router.post('/create', async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json('error :  missing parameters');
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(404).json('error : email is not valid');
    }

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(404).json('error : password invalid (must length 6 - 16, 1 lowercase, 1 uppercase and 1 special character )');
    }



    const userFind = await User.findOne({
        where: {
            email: email
        }
    })

    if (!userFind) {
        console.log("User doesn't exist in database, we create it !")
        try {
            bcrypt.hash(password, saltRounds, async (err, hash) => {

                let createUser = await User.create({
                    email: email,
                    password: hash,
                    id_rank: 0,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                })

                if (createUser) {
                    res.send('User has been created successfully !')
                }

                else {
                    console.log(err)
                }

            });
        }
        catch (err) {
            console.log(err)
        }
    }

    if (userFind instanceof User) {
        return res.status(404).json('user already exist !')
    }

})



module.exports = router;