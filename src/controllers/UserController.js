const UserService = require('../services/UserService')

const createUser = async (req, res) => {
    try {
        // console.log("req.body: ", req.body)
        let { name, email, password, confirmPassword, phone } = req.body
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email)

        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }

        const respone = await UserService.createUser(req.body)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

let signIn = async (req, res) => {
    try {
        console.log("req.body: ", req.body)
        let { email, password } = req.body

        // if (!user || !password) {
        //     return res.status(200).json({
        //         status: 'Login fail',
        //         message: 'The input is required'
        //     })
        // }

        let signInRes = await UserService.signIn(req.body)
        // console.log("signInRes", signInRes)
        return res.status(200).json(signInRes)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createUser,
    signIn
}


