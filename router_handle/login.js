const db = require('../db/index.js')
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs')
// 导入jwt,用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtconfig = require('../jwt_config/index.js')

exports.register = (req, res) => {
    const reginfo = req.body
    if (!reginfo.username || !reginfo.password) {
        return res.send({
            status: 1,
            message: '账号或者密码不能为空'
        })
    }
    const sql = 'select * from users where username = ?'
    db.query(sql, reginfo.username, (err, results) => {
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '账号已存在'
            })
        }
        reginfo.password = bcrypt.hashSync(reginfo.password, 10)
        const sql1 = 'insert into users set ?'
        const create_time = new Date()
        db.query(sql1, {
            username: reginfo.username,
            password: reginfo.password,
            create_time,
        }, (err, results) => {
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册账号失败'
                })
            }
            res.send({
                status: 0,
                message: '注册账号成功'
            })
        })
    })
}

exports.login = (req, res) => {
    const loginfo = req.body
    // 第一步 查看数据表中有没有前端传过来的账号
    const sql = 'select * from users where username = ?'
    db.query(sql, loginfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败')
        const compareResult = bcrypt.compareSync(loginfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('登录失败')
        }
        
        const user = {
            ...results[0],
            password: '',
            create_time: '',
            update_time: '',
        }
        const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
            expiresIn: '7h'
        })
        res.send({
            results: results[0],
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr,
        })
    })
}
