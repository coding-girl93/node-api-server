const express = require('express');
const router = express.Router();
const articleHandler = require('../router_handler/article-cate');
const { update_cate_schema}  = require('../schema/article-cate');
const expressJoi = require('@escook/express-joi')

// 获取文章分类列表数据的路由
router.get("/cates", articleHandler.getArticleCate)
router.post("/add-cates", expressJoi(update_cate_schema) ,articleHandler.addArticleCate)
// 获取文章列表数据的路由
module.exports = router;