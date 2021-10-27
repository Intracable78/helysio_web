var express = require('express');
var router = express.Router();

const db = require('../models/index');
const Console = require("console");
const categories = require("../models/category")(db.sequelize, db.Sequelize.DataTypes);

router.post('/', async (req, res) => {
    console.log("category/")

    const types = req.body.types

    if (!types)
        return res.status(400).send('Missing parameter')

    const category = {
        types: types
    }

    let categoryCreated = await categories.create(category)

    return res.status(200).send(categoryCreated);
})

router.get('/',async (req, res) => {
    Console.log("/category")
    let allCategories = await categories.findAll()

    return res.status(200).send(allCategories)
})

module.exports = router;