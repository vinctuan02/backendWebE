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

let getProductByPage = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("limit, page, sort: ", limit, page, sort, filter)
            const totalProduct = await Product.count()

            if (filter) {
                let lable = filter[0]
                let DetailsProduct = await Product.find({ [lable]: { '$regex': filter[1] } }).skip((page - 1) * limit).limit(limit)
                resolve({
                    status: 'Oke',
                    message: 'Get all details product was successful',
                    data: DetailsProduct,
                    totalProduct,
                    pageCurrent: Number(page),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            if (sort) {
                let objectSort = {}
                objectSort[sort[1]] = sort[0]
                // console.log("objectSort: ", objectSort)
                let DetailsProduct = await Product.find().skip((page - 1) * limit).limit(limit).sort(objectSort)
                resolve({
                    status: 'Oke',
                    message: 'Get all details product was successful',
                    data: DetailsProduct,
                    totalProduct,
                    pageCurrent: Number(page),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            let DetailsProduct = await Product.find().skip((page - 1) * limit).limit(limit)

            resolve({
                status: 'Oke',
                message: 'Get all details product was successful',
                data: DetailsProduct,
                totalProduct,
                pageCurrent: Number(page),
                totalPage: Math.ceil(totalProduct / limit)
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getAllDetailsProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allDetailsProduct = await Product.find()
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
    getProductByPage,
    getAllDetailsProduct
}