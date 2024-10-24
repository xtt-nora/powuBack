
const express = require('express')
// 创建express实例
const app = express()
// const path = require('path');
var bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
const loginRouter = require('./router/login')
app.use('/api',loginRouter)
app.listen(3007, () => {
	console.log('http://127.0.0.1:3007')
})