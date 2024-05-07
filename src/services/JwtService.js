const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const genneralAccessToken = async (payload) => {
    // console.log("payload: ", payload)
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
    return access_token
}

const genneralRefreshToken = async (payload) => {
    // console.log("payload: ", payload)
    const access_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '356d' })
    return access_token
}

const refreshToken = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("token JWTService: ", token)
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'Erro',
                        message: 'The authemtication'
                    })
                } else {
                    console.log("user: ", user)
                    let { payload } = user
                    const access_token = await genneralAccessToken({
                        id: payload?.id,
                        isAdmin: payload?.isAdmin
                    })
                    resolve({
                        status: 'Oke',
                        message: 'Get all user was successful',
                        data: access_token
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshToken
}