const db = require('../db/index.js')
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs')
// 导入jwt,用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtconfig = require('../jwt_config/index.js')

exports.register = (req, res) => {
   res.send('注册')
}

exports.login = (req, res) => {
     res.send('登录')
}