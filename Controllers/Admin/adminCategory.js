var express = require('express');
var router = express.Router();

const db = require('./../../models/index');
const Console = require("console");
const categories = require("../../models/category")(db.sequelize, db.Sequelize.DataTypes);
const isAdmin = require('../../middleware/isAdmin');

router.post('/', async (req, res) => {

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



router.get('/:id', async (req, res) => {
    Console.log("/category/" + req.params.id)

    const id = req.params.id

    if (!id)
        return res.status(400).send('Missing parameter')

    let category = await categories.findByPk(id)

    return res.status(200).send(category)
})

module.exports = router;