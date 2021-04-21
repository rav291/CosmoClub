import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc       Fetch all products
// @route      GET /api/products
// @access     Public  

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

// @desc       Fetch single product
// @route      GET /api/products/:id
// @access     Public  

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product)
    }
    else {
        res.status(404) // optional, if we don't then 500 is default
        throw new Error('Product not found')
        // res.status(500).json({ message: 'Product not found' }) <-- This is also valid
        // new Error generates Error, which is caught by the errorHandler fn. inside the errorMiddleware
    }
})

export {
    getProducts,
    getProductById
} 