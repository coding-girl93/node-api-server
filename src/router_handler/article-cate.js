
const db = require('../db/index')

// 获取文章分类
exports.getArticleCate= (req, res) => {
  const sql  = 'SELECT * FROM ev_article_cate where is_delete=0 order by id asc'

  db.query(sql, (err, result) => {
    if(err){
      return  res.cc(err)
    }
    res.send({
      status:0,
      message:'success',
      data: result
    })
  })
  
}
// 获取文章分类
exports.addArticleCate= (req, res) => {
  // 查询是否已经插入过分类
  const sql = 'SELECT * FROM ev_article_cate where name=? or alias=?'
  db.query(sql, [req.body.name,req.body.alias], (err, result) => {
    if(err){
      return  res.cc(err)
    }
    if(result.length===2){
      return  res.cc('该分类名称和分类别名已存在')
    }
    if(result.length===1 && result[0].name===req.body.name && result[0].alias===req.body.alias){
      return  res.cc('该分类名称和分类别名已存在')
    }
    if(result.length===1 && result[0].name===req.body.name ){
      return  res.cc('该分类名称已存在')
    }
    if(result.length===1 && result[0].alias===req.body.alias){
      return  res.cc('分类别名已存在')
    }
    const addSql = 'INSERT INTO ev_article_cate (name,alias) VALUES (?,?)'
    db.query(addSql, [req.body.name,req.body.alias], (err, result) => {
      if(err){
        return  res.cc(err)
      }
      if(result.affectedRows!==1){
        return  res.cc('新增文章分类失败')
      }
      res.send({
        status:0,
        message:'新增文章分类成功',
      })
    })

  })
 
}

// 删除文章分类
exports.deleteArticleCate = (req,res)=>{
  const sql = `update ev_article_cate set is_delete=1 where id = ?`
  db.query(sql,req.params.id,(err,result)=>{
    if(err){
      return  res.cc(err)
    }
    if(result.affectedRows!==1){
      return  res.cc('删除文章分类失败')
    }
    res.send({
      status:0,
      message:'删除文章分类成功',
    })
  })
}
