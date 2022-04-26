const asyncHandler = require('express-async-handler')
const Cart = require('../models/cartModel')

// @desc Create Cart
// @route POST /cart
// @access Private
const createCart = asyncHandler(async (req, res) => {
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch(err){
        res.status(500).json(err)
    }
})

// @desc Update Cart
// @route PUT /cart
// @access Private
const updateCart = asyncHandler(async (req, res) => {
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        res.status(200).json(updatedCart)
    } catch(err){
        res.status(500).json(err)
    }
})

// @desc Delete Cart
// @route DELETE /cart
// @access Private
const deleteCart = asyncHandler(async (req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted.')
    } catch(err){
        res.status(500).json(err)
    }
})

// @desc Get User Cart
// @route GET /cart
// @access Private
const getUserCart = asyncHandler(async (req, res) => {
    try {
        const userCart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(userCart);
      } catch (err) {
        res.status(500).json(err);
      }
})

// @desc Get All Cart
// @route GET /cart
// @access Private
const getAllCart = asyncHandler(async (req, res) => {
    try {
        const carts = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(carts);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCart
}