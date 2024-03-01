//import
const router=require('express').Router();
const express = require("express");

const articleController=require('../controllers/articleControllers.js');

const {authGuard,authGuardAdmin } = require('../middleware/authGuard.js');


router.post('/create_article',  articleController.createArticle)

router.get("/get_articles",articleController.getArticles)

router.get("/get_article/:id", articleController.getSingleArticle)

router.put("/update_article/:id", articleController.updateArticle)

router.delete("/delete_article/:id", articleController.deleteArticle)


//pagination routes
router.get('/get_pagination',articleController.getPagination)
//export
module.exports=router;
