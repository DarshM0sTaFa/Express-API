const mongoose = require('mongoose')
const mysql = require('mysql2')
const joi = require('joi')

const schemaValidtion = joi.object({
    firstName: joi.string().alphanum().min(2).max(30).required(),
    lastName: joi.string().alphanum().min(2).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    age: joi.number().min(5).max(100).required(),
    phone: joi.number().min(4).max(40).required()

})

let studentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    phone: Number
})
let Student = mongoose.model('student', studentSchema)
let url = 'mongodb://localhost:27017/colleage'

module.exports.postStudentModel = (firstName, lastName, email, age, phone) => {
    console.log(firstName + ' ' + lastName + ' ' + email + '  ' + age + ' ' + phone);
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
            let validation = schemaValidtion.validate({ firstName: firstName, lastName: lastName, email: email, age: age, phone: phone })
            if (validation.error) {
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }

            let student = new Student({
                firstName: firstName,
                lastName: lastName,
                email: email,
                age: age,
                phone: phone
            })
            return student.save()
        }).then((student) => {
            mongoose.disconnect()
            resolve(student)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })


    })

}

module.exports.getAllStudentsModel = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Student.find({})
        }).then((students) => {
            mongoose.disconnect()
            resolve(students)
        })


    })

}

module.exports.getStudentByIDModel = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Student.findById({ _id: id })
        }).then((student) => {
            mongoose.disconnect()
            resolve(student)
        }).catch(err => reject(err))


    })

}

module.exports.deleteStudentModel = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Student.deleteOne({ _id: id })
        }).then((student) => {
            mongoose.disconnect()
            resolve(student)
        }).catch(err => reject(err))


    })

}

module.exports.updateStudentModel = (id, firstName, lastName, email, age, phone) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            let validation = schemaValidtion.validate({ firstName: firstName, lastName: lastName, email: email, age: age, phone: phone })
            if (validation.error) {
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }

            return Student.updateOne({ _id: id }, { firstName: firstName, lastName: lastName, email: email, age: age, phone: phone })
        }).then((student) => {
            mongoose.disconnect()
            resolve(student)
        }).catch(err => reject(err))


    })

}