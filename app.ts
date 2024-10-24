const express = require('express')
const app = express()
var bodyParser = require('body-parser')
// 导入cors
const cors = require('cors')
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(3007, () => {
	console.log('http://127.0.0.1:3007')
})