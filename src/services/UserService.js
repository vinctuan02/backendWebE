const User = require('../models/UserModel')
const bcrypt = require('bcrypt')

const createUser = (inforUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { name, email, password, confirmPassword, phone } = inforUser
            let checkUser = await User.findOne({
                email: email
            })

            if (checkUser) {
                resolve({
                    status: 'Oke',
                    message: 'Email is already'
                })
            }

            let passHash = bcrypt.hashSync(password, 10)

            let createdUser = await User.create({
                name, email, password: passHash, phone
            })

            if (createdUser) {
                resolve({
                    status: 'Oke',
                    message: 'Create user successed.'
                })
            }

        } catch (error) {
            reject(e)
        }
    })
}

let signIn = (userInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password } = userInfor
            let passHash = bcrypt.hashSync(password, 10)
            console.log(passHash)
            let checkUser = await User.findOne({
                email: email,
                password: '$2b$10$qjTYBfS2AJ7fKho7RlIrQOWloSaNykb6IAj6X49chGksxFy7i0FfC'
            })

            console.log("check user: ", checkUser)

            if (checkUser) {
                console.log("Login success.")
                resolve({
                    status: 'Oke',
                    message: 'Create user successed.'
                })
            } else {
                console.log("Login fail")
                resolve({
                    status: 'Oke',
                    message: 'Create user fail.'
                })
            }

            resolve({
                status: '??',
                message: '??'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createUser,
    signIn
}