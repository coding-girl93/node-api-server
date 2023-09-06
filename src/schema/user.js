const Joi = require('joi'); // 定义验证规则

const username = Joi.string().alphanum().min(1).max(10).required();
const password = Joi.string().pattern(/^[\S]{6,12}$/).required();

const id = Joi.number().integer().min(1).required();
const nickname = Joi.string().required();
const email = Joi.string().email().required();

// 定义验证注册和登录表单数据的对象
exports.register_login_schema = {
  body:{
    username,
    password
  }
}

exports.update_userInfo_schema = {
  body:{
    id,
    nickname,
    email
  }
}

exports.update_password_schema = {
  body:{
    oldPassword:password,
    newPassword:Joi.not(Joi.ref('oldPassword')).concat(password)
  }
}


