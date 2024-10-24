
const express = require('express')
const router = express.Router()
const loginHandler = require('../router_handle/login')


// 注册
router.post('/register',loginHandler.register)
router.post('/login',loginHandler.login)
// 向外暴露路由
module.exports = router