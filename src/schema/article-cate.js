const Joi = require('joi'); // 定义验证规则

const name = Joi.string().required();
const alias = Joi.string().alphanum().required();
const id = Joi.number().integer().min(1).required();

exports.add_cate_schema = {
  body:{
    name,
    alias
  }
}

exports.delete_cate_schema = {
  params:{
    id
  }
}

exports.get_cate_schema = {
  params:{
    id
  }
}


exports.update_cate_schema = {
  body:{
    id,
    name,
    alias
  }
}


