const bcrypt = require('bcrypt')
const User = require('./models/UserModel')

const testFunc = async () => {
    // console.log("Test Func: ")
    // let User1 = await User.findOne({
    //     email: 'tuan1@gmail.com'
    // })
    // let pass = '1'
    // hashedPass = User1.password

    // let isPw = await bcrypt.compare(pass, hashedPass)

    // console.log(isPw)
    // console.log("User1: ", User1)
    // return 0
}

module.exports = {
    testFunc
}