var express = require('express');
var router = express.Router();

const db = require('../models/index');
const Console = require("console");
const posts = require("../models/post")(db.sequelize, db.Sequelize.DataTypes);

router.post('/', async (req, res) => {
    console.log("/")

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
    Console.log("/post")
    let allPosts = await posts.findAll()

    return res.status(200).send(allPosts)
})

router.get('/:postId',async (req, res) => {
    Console.log("/post/",req.params.postId)
    let singlePost = await posts.findByPk(req.params.postId)

    if (!singlePost)
        return res.status(400).send("Id out of range")

    return res.status(200).send(singlePost)
})

module.exports = router;