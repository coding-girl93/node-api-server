### 利用Node搭建API 服务

<img src="/Users/amy/Desktop/截屏2023-09-07 13.57.37.png" alt="截屏2023-09-07 13.57.37" style="zoom:100%;" />

#### 目录结构

config：Token相关的配置

db：mysql数据库连接

router：路由

router-handler：路由处理函数

app.js：入口文件

#### 第三方依赖

```
 "dependencies": {
    "@escook/express-joi": "^1.1.1",// node端验证规则的中间件
    "joi": "^17.10.1",// 定义校验规则
    "bcryptjs": "^2.4.3", // 加密输入密码
    "cors": "^2.8.5", //解决跨域问题
    "express": "^4.18.2", 
    "express-jwt": "^8.4.1",// 解析JWT的中间件
    "jsonwebtoken": "^9.0.2",// 生成token
    "mysql": "^2.18.1"// 数据库
  }
```

#### 工具安装

1. mysql安装
2. ApiPost7 测试接口