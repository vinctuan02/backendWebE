const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()

const authMiddleWare = (req, res, next) => {
    // console.log("token: ", req.headers)
    const token = req.headers.token.split(' ')[1]
    // console.log("token ", token)
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERR'
            })
        }
        // console.log("user: ", user)
        const { payload } = user
        if (payload?.isAdmin) {
            // console.log("true")
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERR'
            })
        }
    })
}

const authUserMiddleWare = (req, res, next) => {
    // console.log("token: ", req.headers)
    const token = req.headers.token.split(' ')[1]
    // console.log("token ", token)
    let idUserParams = req.params.id
    // console.log("idUserParams: ", idUserParams)
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERR'
            })
        }
        // console.log("user: ", user)
        const { payload } = user
        if (payload?.isAdmin || payload?.id === idUserParams) {
            // console.log("true")
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERR'
            })
        }
    })
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}