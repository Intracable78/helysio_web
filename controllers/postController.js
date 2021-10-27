var express = require('express');
var router = express.Router();

const db = require('../models/index');
const posts = require("../models/post")(db.sequelize, db.Sequelize.DataTypes);

router.post('/', async (req, res) => {
    console.log(req.body)

    const title = req.body.title
    const content = req.body.content
    const id_category = req.body.id_category

    if (!title || !content || !id_category)
        return res.status(400).send('Missing parameter')

    const post = {
        title: title,
        content: content,
        date_post: Date.now(),
        id_category: id_category
    }

    let postCreated = await posts.create(post)

    return res.status(200).send(postCreated);
})

router.get('/',async (req, res) => {
    let allPosts = await posts.findAll()

    return res.status(200).send(allPosts)
})

module.exports = router;