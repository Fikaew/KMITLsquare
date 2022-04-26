const express = require('express')
const router = express.Router()

const {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCart
} = require('../controllers/cartController')

router.route('/').post(createCart)