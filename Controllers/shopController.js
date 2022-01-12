const express = require('express');
const router  = express.Router();
const db = require('../models/index');
const Shop = require("../models/article")(db.sequelize, db.Sequelize.DataTypes);


//create an article

router.post('/create', async (req, res) => {

    const description = req.body.description;
    const idCategory = req.body.idCategory;
    const title = req.body.title;

    if(!description || !idCategory || !title){
        res.status(404).send('Missing parameters');
        return;
    }

    const newArticle = {
        description: description,
        title: title,
        id_category: idCategory,
        updatedAt: Date.now(),
        createdAt: Date.now()
    }

    const createdArticle = await Shop.create(newArticle);
    res.status(201).send(`Article created successfully : ${createdArticle}` );

})


// get all articles

router.get('/articles', async  (req, res) => {

    const allArticles = await Shop.findAll();

    res.status(200).json(allArticles);

})


//get one article by ID

router.get('/article/:idArticle', async (req, res) => {

    const articleFound = await Shop.findByPk(req.params.idArticle);

    if(!articleFound){
        res.status(404).send(`Article not found ! `);
    }

    res.status(200).json(articleFound);
    
})

//update one article by id

router.post('/article/:idArticle/update', async (req, res) => {

    const description = req.body.description;
    const idCategory = req.body.idCategory;
    const title = req.body.title;

    const articleFound = await Shop.findByPk(req.params.idArticle);

    if(!articleFound){
        res.status(404).send(`Article not found ! `);
    }

    const updatedArticle = await articleFound.update({ 
        description: description, 
        id_category: idCategory,
        title: title,
    })

    res.status(200).json(updatedArticle);

})


// delete one article by id

router.delete('/article/:idArticle/delete', async (req, res) => {

    const articleFound = await Shop.findByPk(req.params.idArticle);

    if(!articleFound){
        res.status(400).send('Article id not found');
    }

    await articleFound.destroy();

    res.status(200).send('Article deleted successfully');

})


// get articles by Category

router.get('/article/category/:idCategory', async (req, res) => {

    const idCategory = req.params.idCategory;

    const articlesFound = await Shop.findAll({where: 
        {id_category: idCategory}
    })

    if(!articlesFound){
        res.status(400).send("Category id does not exist");
    }

    res.status(200).json(articlesFound);


})

module.exports = router;