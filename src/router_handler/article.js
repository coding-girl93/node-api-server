
const db = require('../db/index')

// 路由处理行数模块
exports.getArticleCate= (req, res) => {
  const sql  = 'SELECT * FROM ev_article_cate where is_delete=0 order by id asc'

  db.query(sql, (err, result) => {
    if(err){
      res.cc(err)
    }
    res.send({
      status:0,
      message:'success',
      data: result
    })
  })
  
}
