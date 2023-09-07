const Joi = require('joi'); // 定义验证规则

const title = Joi.string().required();
const content = Joi.string().required();
const id = Joi.number().integer().min(1).required();

exports.add_article_schema = {
  body:{
    title,
    content
  }
}

exports.delete_article_schema = {
  params:{
    id
  }
}

exports.get_article_schema = {
  params:{
    id
  }
}


exports.update_article_schema = {
  body:{
    id,
    title
  }
}


