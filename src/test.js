const bcrypt = require('bcrypt')

const testFunc = async () => {
    console.log("Test Func: ")
    let hasdedPass = bcrypt.hashSync('1', 10)
    let checkPw = await bcrypt.compare('1', hasdedPass)
    console.log(checkPw)
    console.log("hasdedPass: ", hasdedPass)
    return 0
}

module.exports = {
    testFunc
}