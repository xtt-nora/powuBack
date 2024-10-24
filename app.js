
const express = require('express')
// 创建express实例
const app = express()
// const path = require('path');
var bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
	res.cc = (err, status = 1) => {
		res.send({
			status,
			message: err instanceof Error ? err.message : err,
		})
	}
	next()
})

const jwtconfig = require('./jwt_config/index.js')
// const {
// 	expressjwt: jwt
// } = require('express-jwt')
// app.use(jwt({
// 	secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
// 	path:[/^\/api\//]
// }))

const loginRouter = require('./router/login')
app.use('/api', loginRouter)
app.listen(3007, () => {
	console.log('http://127.0.0.1:3007')
})