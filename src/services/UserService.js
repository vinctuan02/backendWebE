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

            console.log(createdUser)

            if (createdUser) {
                resolve({
                    status: 'Oke',
                    message: 'Oke'
                })
            }

        } catch (error) {
            reject(e)
        }
    })
}

module.exports = {
    createUser
}