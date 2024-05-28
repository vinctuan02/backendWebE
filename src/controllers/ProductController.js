const ProductService = require('../services/ProductService')
// const JwtService = require('../services/JwtService')

const createProduct = async (req, res) => {
    try {
        // console.log("req.body: ", req.body)
        let { name, image, type, price, countInStock, rating, description } = req.body

        if (!name || !image || !type || !price || !countInStock || !rating || !description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }

        const respone = await ProductService.createProduct(req.body)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const updateProduct = async (req, res) => {
    // console.log("Update product")
    try {
        let idProduct = req.params.id
        // console.log("idProduct: ", idProduct)
        if (!idProduct) {
            return res.status(200).json({
                status: 'Oke',
                message: 'Id product is not found'
            })
        }

        const respone = await ProductService.updateProduct(idProduct, req.body)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailsProduct = async (req, res) => {
    // console.log("Update product")
    try {
        let idProduct = req.params.id
        // console.log("idProduct: ", idProduct)
        if (!idProduct) {
            return res.status(200).json({
                status: 'Oke',
                message: 'Id product is not found'
            })
        }

        const respone = await ProductService.getDetailsProduct(idProduct)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getProductByPage = async (req, res) => {
    // console.log("getProductByPage :")
    let { limit, page, sort, filter } = req.query
    // console.log("req.query: ", limit, page)
    try {
        const respone = await ProductService.getProductByPage(limit || 4, page || 1, sort, filter)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllDetailsProduct = async (req, res) => {
    try {
        const respone = await ProductService.getAllDetailsProduct()
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteProduct = async (req, res) => {
    // console.log("Update product")
    try {
        let idProduct = req.params.id
        // console.log("idProduct: ", idProduct)
        if (!idProduct) {
            return res.status(200).json({
                status: 'Oke',
                message: 'Id product is not found'
            })
        }

        const respone = await ProductService.deleteProduct(idProduct)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getProductByPage,
    getAllDetailsProduct
}


