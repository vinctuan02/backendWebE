const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createProduct = (inforProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { name, image, type, price, countInStock, rating, description } = inforProduct
            let checkProduct = await Product.findOne({
                name: name
            })

            if (checkProduct) {
                resolve({
                    status: 'Oke',
                    message: 'Product is already'
                })
            } else {
                let createProduct = await Product.create({
                    name, image, type, price, countInStock, rating, description
                })

                if (createProduct) {
                    resolve({
                        status: 'Oke',
                        message: 'Create product successed.'
                    })
                }
            }

        } catch (error) {
            reject(e)
        }
    })
}

let updateProduct = (idProduct, inforProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("Update product ser")
            // console.log("idProduct: ", idProduct)
            let checkProduct = await Product.findOne({
                _id: idProduct
            })

            // console.log("checkProduct: ", checkProduct)
            if (!checkProduct) {
                resolve({
                    status: 'Oke',
                    message: 'Product is not defined'
                })
            }

            let updateProduct = await Product.findByIdAndUpdate(idProduct, inforProduct, { new: true })

            // 6634c26d3079d7f3e8305abd

            // console.log("updateProduct: ", updateProduct)
            resolve({
                status: 'Oke',
                message: 'Product update was successful',
                data: updateProduct
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getDetailsProduct = (idProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("idProduct: ", idProduct)
            let checkProduct = await Product.findOne({
                _id: idProduct
            })

            // console.log("checkProduct: ", checkProduct)
            if (!checkProduct) {
                resolve({
                    status: 'Oke',
                    message: 'Product is not defined'
                })
            }

            let detailsProduct = await Product.findOne({
                _id: idProduct
            })

            // 6634c26d3079d7f3e8305abd

            // console.log("updateProduct: ", updateProduct)
            resolve({
                status: 'Oke',
                message: 'Get details product was successful',
                data: detailsProduct
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getAllDetailsProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allDetailsProduct = await Product.find()
            resolve({
                status: 'Oke',
                message: 'Get all details product was successful',
                data: allDetailsProduct
            })

        } catch (error) {
            reject(error)
        }
    })
}

let deleteProduct = (idProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("idProduct: ", idProduct)
            let checkProduct = await Product.findOne({
                _id: idProduct
            })

            // console.log("checkProduct: ", checkProduct)
            if (!checkProduct) {
                resolve({
                    status: 'Oke',
                    message: 'Product is not defined'
                })
            }

            let deleteProduct = await Product.findByIdAndDelete(idProduct, { new: true })

            // 6634c26d3079d7f3e8305abd

            // console.log("updateProduct: ", updateProduct)
            resolve({
                status: 'Oke',
                message: 'Delete product was successful',
                data: deleteProduct
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllDetailsProduct
}