const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {

        // console.log("req.body: ", req.body)
        let { name, email, password, confirmPassword, phone } = req.body
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            // if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }

        const respone = await UserService.createUser(req.body)
        if (respone.status === "ERR") {
            return res.status(400).json(respone)
        }
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        // console.log("req.body: ", req.body)
        let { name, email, password, confirmPassword, phone } = req.body
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email)

        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }

        const respone = await UserService.loginUser(req.body)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateUser = async (req, res) => {
    try {
        let userId = req.params.id
        // console.log("params.id: ", id)
        // console.log("req.body: ", req.body)
        if (!userId) {
            return res.status(200).json({
                status: 'Oke',
                message: 'Id user is not found'
            })
        }

        const respone = await UserService.updateUser(userId, req.body)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id
        // console.log("params.id: ", id)
        // console.log("req.body: ", req.body)
        if (!userId) {
            return res.status(200).json({
                status: 'Oke',
                message: 'Id user is not found'
            })
        }

        const respone = await UserService.deleteUser(userId)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const respone = await UserService.getAllUser()
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        // console.log("get Detail User")
        let idUser = req.params.id
        // console.log("idUser: ", idUser)
        const respone = await UserService.getDetailUser(idUser)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        let token = req.headers.token.split(' ')[1]
        if (!token) {
            return res.status(200).json({
                status: 'Oke',
                message: 'Token is not found'
            })
        }
        const respone = await JwtService.refreshToken(token)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getDetailUser,
    getAllUser,
    refreshToken
}


