const db = require('../db')
const bcrypt = require('bcryptjs') // 加密

// 获取用户信息
exports.getUserInfo = (req, res)=>{
  const sql = `select id,username,nickname,email,user_pic from ev_users where id =?`
  console.log('===',req.auth)
  db.query(sql,req.auth.id,(err,result)=>{
    if(err){
      return res.cc(err)
    }    
    if(result.length !== 1){
      return res.cc('获取用户信息失败')
    }
    res.send({
      status: 0,
      message:"获取用户信息成功",
      data:result[0]
    })
  })
  
}
// 更新用户信息
exports.updateUserInfo = (req, res)=>{
  const userInfo = req.body
  const sql = `update ev_users set ? where id =?`
  db.query(sql,[userInfo,userInfo.id],(err,result)=>{
    if(err){
      return res.cc(err)
    }
    if(result.affectedRows!== 1){
      return res.cc('更新用户信息失败')
    }
    res.send({
      status: 0,
      message:'更新用户信息成功'
    })
  })
}

// 更新用户密码
exports.updateUserPassword = (req, res)=>{
  const sql = `select * from ev_users  where id =?`
  // const sql = `update ev_users set password=? where id =?`
  db.query(sql,[req.auth.id],(err,result)=>{
    if(err){
      return res.cc(err)
    }
    if(result.length!==1){
      return res.cc('用户不存在')
    }
    const userInfo = result[0]
    //判断用户输入的旧密码
    const comparePassword = bcrypt.compareSync(req.body.oldPassword,userInfo.password)
    if(!comparePassword){
      return res.cc('原密码错误')
    }
    //修改密码
    const updateSql = `update ev_users set password=? where id =?`
    const newPassword = bcrypt.hashSync(req.body.newPassword,10)

    db.query(updateSql,[newPassword,req.auth.id],(err,result)=>{
      if(err){
        return res.cc(err)
      }
      if(result.affectedRows!== 1){
        return res.cc('更新密码失败')
      }
      res.send({
        status: 0,
        message:'更新密码成功'
      })
    })
   
  })
}

// 更新用户头像
exports.updateUserAvatar= (req,res)=>{
  const sql = `update ev_users set user_pic=? where id =?`
  db.query(sql,[req.body.avatar, req.auth.id],(err,result)=>{
    if(err){
      return res.cc(err)
    }
    if(result.affectedRows!== 1){
      return res.cc('更新头像失败')
    }
    res.send({
      status: 0,
      message:'更新头像成功'
    })
  })

}