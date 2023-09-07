const express = require('express');
const router = express.Router();
const articleHandler = require('../router_handler/article-cate');
const { add_cate_schema,delete_cate_schema,get_cate_schema,update_cate_schema}  = require('../schema/article-cate');
const expressJoi = require('@escook/express-joi')

router.get("/cates", articleHandler.getArticleCate)
router.post("/add-cates", expressJoi(add_cate_schema) ,articleHandler.addArticleCate)
router.get("/delete-cates/:id",expressJoi(delete_cate_schema), articleHandler.deleteArticleCate)
router.get("/getCates/:id",expressJoi(get_cate_schema), articleHandler.getArticleCateById)
router.post("/updateCate",expressJoi(update_cate_schema), articleHandler.updateArticleCate)

// 获取文章列表数据的路由
module.exports = router;