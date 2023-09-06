const db = require('../db')
const bcrypt = require('bcryptjs') // 加密
const  jwt = require('jsonwebtoken') // 生成token
const config = require('../config')

// 用户注册
exports.register = (req, res)=>{
  const userInfo = req.body
  console.log('客户端提交的数据',userInfo)
  // // 合法校验
  // if(!userInfo.username ||!userInfo.password){
  //   return res.cc('用户名或密码不能为空')
  // }
  // 是否已经注册
  const sql = `select * from ev_users where username=?`
  db.query(sql, [userInfo.username], (err, result)=>{
    // 执行sql失败
    if(err){
      return res.cc(err)
    }
    // 用户名被占用了
    if(result.length > 0){
      return res.cc('用户名被占用，请更换其他用户名')
    }
    // 调用bcrypt.hashSync 密码加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    // 插入数据
    const addSql = `insert into ev_users set?`
    console.log('插入的数据：',userInfo)
    db.query(addSql, {username:userInfo.username,password:userInfo.password}, (err, result)=>{
      //执行sql失败
      if(err){
        return res.cc(err)
      }
      // 注册失败
      if(result.affectedRows !==1){
        return res.cc('用户注册失败，请重新注册')
      }
      res.send({
        status: 0,
        message: '注册成功'
      })
    })
  })

}
// 用户登录
exports.login = (req, res)=>{
  const userInfo = req.body
  const sql = `select * from ev_users where username=?`
  db.query(sql, [userInfo.username], (err, result)=>{
    if(err){
      return res.cc(err)
    }
    if(result.length === 0){
      return res.cc("登录失败")
    }
     //  密码是否正确
    const compare = bcrypt.compareSync(userInfo.password, result[0].password)
    if(!compare){
      return res.cc("登录失败")
    }
    // 在服务器端生成Token字符串
    const user ={...result[0],password:'',user_pic:''}
    console.error('user===',user)
    const token = jwt.sign({...user}, config.jwtSecretKey,{ expiresIn:'10h'})
    console.error('token===',token)
    res.send({
      status:0,
      massage:'登录成功',
      token:"Bearer "+token
    })
  })
 
}
