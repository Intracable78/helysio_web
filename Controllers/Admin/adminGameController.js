var express = require('express');
var router = express.Router();

const db = require('../../models/index');
const games = require("../../models/game")(db.sequelize, db.Sequelize.DataTypes);

router.post('/', async (req, res) => {
    const name = req.body.name
    const description = req.body.description

    if (!description || !name)
        return res.status(400).send('Missing parameter')

    const game = {
        name: name,
        description: description
    }

    let gameCreated = await games.create(game)

    return res.status(200).send(gameCreated);
})

router.get('/', async (req, res) => {
    let allGames = await games.findAll()

    return res.status(200).send(allGames)
})

router.get('/:gameId', async (req, res) => {

    let game = await games.findByPk(req.params.gameId)

    if (!game)
        return res.status(400).send("Id does not exists")

    return res.status(200).send(game)
})

module.exports = router;