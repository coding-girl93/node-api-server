const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/user');
const {register_login_schema} = require('../schema/user');
const expressJoi = require('@escook/express-joi')

router.post('/register',expressJoi(register_login_schema),routerHandler.register);
router.post('/login', expressJoi(register_login_schema),routerHandler.login);

module.exports = router;