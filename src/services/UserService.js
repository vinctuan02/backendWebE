const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (inforUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { name, email, password, confirmPassword, phone } = inforUser
            let checkUser = await User.findOne({
                email: email
            })

            if (checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'Email is already'
                })
            } else {
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
            }

        } catch (error) {
            reject(e)
        }
    })
}

let loginUser = (userInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password } = userInfor

            let checkUser = await User.findOne({
                email: email,
            })

            if (!checkUser) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            // console.log("checkUser: ", checkUser)

            let comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }

            let access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            let refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 'Oke',
                message: 'Login sucessed',
                access_token,
                refresh_token
            })

        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (userId, userInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await User.findOne({
                _id: userId
            })

            if (!checkUser) {
                resolve({
                    status: 'Oke',
                    message: 'User is not defined'
                })
            }

            let updateUser = await User.findByIdAndUpdate(userId, userInfor, { new: true })

            // 6634c26d3079d7f3e8305abd

            console.log("updateUser: ", updateUser)
            resolve({
                status: 'Oke',
                message: 'User update was successful',
                data: updateUser
            })

        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = await User.findOne({
                _id: userId
            })

            if (!checkUser) {
                resolve({
                    status: 'Oke',
                    message: 'User is not defined'
                })
            }

            await User.findByIdAndDelete(userId, { new: true })

            // 6634c26d3079d7f3e8305abd

            // console.log("updateUser: ", updateUser)
            resolve({
                status: 'Oke',
                message: 'Delete user was successful',
                data: updateUser
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getDetailUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(idUser)
            // let User = await User.findOne({
            //     _id: '6639a074a942d893d1b94cdf'
            // })

            let checkUser = await User.findOne({
                _id: idUser
            })

            if (!checkUser) {
                resolve({
                    status: 'Oke',
                    message: 'User is not defined'
                })
            }
            resolve({
                status: 'Oke',
                message: 'Get detail user was successful',
                data: checkUser
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allUser = await User.find()

            resolve({
                status: 'Oke',
                message: 'Get all user was successful',
                data: allUser
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getDetailUser,
    getAllUser
}