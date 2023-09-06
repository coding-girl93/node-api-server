const express = require('express');
const router = express.Router();
const articleHandler = require('../router_handler/article');
// 获取文章分类列表数据的路由
router.get("/cates", articleHandler.getArticleCate)
// 获取文章列表数据的路由
module.exports = router;