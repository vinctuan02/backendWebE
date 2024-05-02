const express = require('express')
const app = express()
const dotenv = require('dotenv')
const routes = require('./routers')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.set('strictQuery', false);

dotenv.config()

app.use(bodyParser.json())
routes(app)

app.get('/', (req, res) => {
    return res.send("Hello world")
})

// mongodb://localhost:27017
mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log("Connect DB Success")
    })
    .catch((err) => {
        console.log("Connect DB fail ", err)
    })

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log("Server is running in port: ", port)
})