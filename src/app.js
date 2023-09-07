const express = require('express');
const app= express();
const cors = require('cors');
const userRouter = require('./router/user');
const articleCateRouter = require('./router/article-cate');
const userInfoRouter = require('./router/userInfo');
const articlesRouter = require('./router/articles');
const joi = require('joi'); // 中间件
const {expressjwt:jwt} = require('express-jwt')

// 配置跨域访问中间件
app.use(cors());

// 全局中间件，路由之前封装 错误回调函数
app.use((req,res,next)=>{
  res.cc = function(err,status=1){
    res.send({
      status,
      massage:err instanceof Error?err.message:err
    })
  }
  next()
})


// 解析表单数据中间件，只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));
// 路由之前配置解析token的中间件
const config = require('./config');
app.use(jwt({
  secret: config.jwtSecretKey,
  algorithms:['HS256']
}).unless({path:[/^\/api/]}));

// 注册路由模块
app.use('/api',userRouter);
app.use('/my/article',articleCateRouter);
app.use('/my',userInfoRouter);
app.use('/my/article',articlesRouter);

// 定义错误级别中间件
app.use((err,req,res,next)=>{
  // 验证失败
 if(err instanceof joi.ValidationError) {
  return res.cc(err)
 }
 //身份认证失败
 if(err.name === 'UnauthorizedError') {
  return res.cc('身份认证失败')
 }
 // 未知的错误
  res.cc(err)
})

app.listen(3007,()=>{
  console.log('listening on port 3007 at http://127.0.0.1:3007');
})