const express = require('express');
const router = express.Router();
const articlesHandler = require('../router_handler/articles');
const { add_article_schema,delete_article_schema,get_article_schema,update_article_schema}  = require('../schema/articles');
const expressJoi = require('@escook/express-joi')

router.get("/getArticleList", articlesHandler.getArticleList)
router.get("/getArticleById/:id", expressJoi(get_article_schema) ,articlesHandler.getArticleById)
router.get("/deleteArticle/:id",expressJoi(delete_article_schema), articlesHandler.deleteArticle)

router.post("/addArticle",expressJoi(add_article_schema), articlesHandler.addArticle)
router.post("/updateArticle",expressJoi(update_article_schema), articlesHandler.updateCate)

// 获取文章列表数据的路由
module.exports = router;