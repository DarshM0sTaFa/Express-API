const route = require('express').Router()
const jwt = require('jsonwebtoken')
const studentModel = require('../models/student.model')

route.get('/', (req, res, next) => {
    res.send('Express API ♠')
})

//  || Accsess Data ||
let secretKey = 'This Is Secret Key 46844515241245545412178923'
verifToken = (req, res, next) => {
    // let toke2 = res.header(authorization)
    let token = req.headers.authorization
    if (!token) {
        res.status(400).json({ msg: 'Accsess Rejected...... !!' })
    }

    try {
        jwt.verify(token, secretKey)
        next()
    } catch (error) {
        res.status(400).json({ error: error })
    }

}

//          || Secure API ||
var privateKey = "darsh" //              Store This In DB
var clientKey = "123456789" //           Store This In DB
verifySecretClient = ((req, res, next) => {
    if (req.params.private == privateKey && req.params.client == clientKey) {
        next()
    } else {
        res.status(400).json({ error: 'You Cant access this route because you sent me secret and client key !' })
    }

})

route.post('/addstudent/:private/:client', verifySecretClient, (req, res, next) => {
    studentModel.postStudentModel(req.body.firstName, req.body.lastName, req.body.email, req.body.age, req.body.phone)
        .then(student => res.status(200).json(student))
        .catch(err => {
            console.log(err);
            res.status(400).json({ error: err })
        })

})

route.get('/students/:private/:client', verifySecretClient, verifToken, (req, res, next) => {
    let token = req.headers.authorization
    let user = jwt.decode(token, { complete: true })
    studentModel.getAllStudentsModel()
        .then(students => res.status(200).json({ students: students, user: user }))
        .catch(err => res.status(400).json(err))

})

route.get('/student/:id/:private/:client', verifySecretClient, verifToken, (req, res, next) => {
    let id = req.params.id
    studentModel.getStudentByIDModel(id)
        .then(student => res.status(200).json(student))
        .catch(err => res.status(400).json(err))

})

route.delete('/delete/:private/:client', verifySecretClient, verifToken, (req, res, next) => {
    let id = req.params.id
    studentModel.deleteStudentModel(id)
        .then(student => res.status(200).json(student))
        .catch(err => res.status(400).json(err))

})

route.patch('/update/:private/:client', verifySecretClient, verifToken, (req, res, next) => {
    let id = req.params.id
    studentModel.updateStudentModel(req.params.id, req.body.firstName, req.body.lastName, req.body.email, req.body.age, req.body.phone)
        .then(student => res.status(200).json(student))
        .catch(err => res.status(400).json({ error: err }))

})


module.exports = route