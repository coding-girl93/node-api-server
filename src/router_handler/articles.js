
const db = require('../db/index')

// 获取文章列表
exports.getArticleList= (req, res) => {
  const sql  = 'SELECT * FROM ev_articles where is_delete=0 order by id asc'
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
// 添加文章
exports.addArticle= (req, res) => {
  // 查询是否已经插入过文章
  const sql = 'SELECT * FROM ev_articles where title=?'
  db.query(sql, [req.body.title], (err, result) => {
    if(err){
      return  res.cc(err)
    }
    if(result.length===1){
      return  res.cc('该文章已存在')
    }
    const addSql = 'INSERT INTO ev_articles (title,content) VALUES (?,?)'
    console.error(req.body)
    db.query(addSql, [req.body.title,req.body.content], (err, result) => {
      if(err){
        console.error(err)
        return  res.cc(err)
      }
      if(result.affectedRows!==1){
        return  res.cc('新增文章失败')
      }
      res.send({
        status:0,
        message:'新增文章成功',
      })
    })

  })
 
}

// 删除文章分类
exports.deleteArticle = (req,res)=>{
  const sql = `update ev_articles set is_delete=1 where id = ?`
  console.error(req.params.id)
  db.query(sql,req.params.id,(err,result)=>{
    if(err){
      return  res.cc(err)
    }
    if(result.affectedRows!==1){
      return  res.cc('删除文章失败')
    }
    res.send({
      status:0,
      message:'删除文章成功',
    })
  })
}
// 根据ID获取文章分类
exports.getArticleById = (req,res)=>{
  const sql = `select * from ev_articles  where id = ?`
  db.query(sql,req.params.id,(err,result)=>{
    if(err){
      return  res.cc(err)
    }
    if(result.length!==1){
      return  res.cc('获取文章失败')
    }
    res.send({
      status:0,
      message:'获取文章成功',
      data:result[0]
    })
  })
}
// 跟新分类
exports.updateCate = (req, res) => {
  // 查询是否已经插入过分类
  const sql = 'SELECT * FROM ev_articles where id<>? and (title=?) '
  db.query(sql, [req.body.title,req.body.id], (err, result) => {
    if(err){
      return  res.cc(err)
    }
    console.error(req.body,result)
    if(result.length===1){
      return  res.cc('该分文章已存在')
    }
 
    const addSql = 'update ev_articles set ? where id =?'
    db.query(addSql, [req.body,req.body.id], (err, result) => {
      if(err){
        return  res.cc(err)
      }
      if(result.affectedRows!==1){
        return  res.cc('更新文章失败')
      }
      res.send({
        status:0,
        message:'更新文章成功',
      })
    })

  })
 
}