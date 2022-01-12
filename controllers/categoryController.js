var express = require('express');
var router = express.Router();

const db = require('../models/index');
const Console = require("console");
const categories = require("../models/category")(db.sequelize, db.Sequelize.DataTypes);

/*

router.post('/', async (req, res) => {
    console.log("category/")

    const name = req.body.name
    const types = req.body.types

    if (!types || !name)
        return res.status(400).send('Missing parameter')

    const category = {
        name: name,
        types: types
    }

    let categoryCreated = await categories.create(category)

    return res.status(200).send(categoryCreated);
})

*/

router.get('/:type', async (req, res) => {
    Console.log("/category/" + req.params.type)

    const type = req.params.type

    let allCategories = await categories.findAll({
        where: {
            types: type
        }
    })

    if (allCategories.length == 0)
        return res.status(400).send('This category type does not exist')

    return res.status(200).send(allCategories)
})

router.get('/:id', async (req, res) => {
    Console.log("/category/" + req.params.id)

    const id = req.params.id

    if (!id)
        return res.status(400).send('Missing parameter')

    let category = await categories.findByPk(id)

    return res.status(200).send(category)
})

module.exports = router;