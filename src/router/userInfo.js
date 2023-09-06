const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/userInfo');
const { update_userInfo_schema ,update_password_schema}  = require('../schema/user');
const expressJoi = require('@escook/express-joi')

router.get('/userInfo',routerHandler.getUserInfo);
router.post('/userInfo',expressJoi(update_userInfo_schema),routerHandler.updateUserInfo);
router.post('/update-password',expressJoi(update_password_schema),routerHandler.updateUserPassword);

module.exports = router;