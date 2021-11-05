const express = require('express')
const RouterStudnet = require('./routes/student.route')
const RouterUser = require('./routes/user.route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
    // app.use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.setHeader('Access-Control-Request-Method', '*')
    //     res.setHeader('Access-Control-Allow-Headers', 'authorization')
    //     next()
    // })

app.use('/', RouterStudnet)
app.use('/', RouterUser)


app.listen(3000, console.log('Server Running'))