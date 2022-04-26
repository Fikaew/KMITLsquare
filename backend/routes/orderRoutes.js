const express = require('express')
const router = express.Router()
const {
    // addToOrder,
    // deleteOrder,
    // deleteProduct,
    // updateOrder,
    // getUserOrder,
    // getAllOrder
    createOrderByShopId,
    getAllOrder,
    getOrderByShopID,
    getOrderByUserID
} = require('../controllers/orderController')

// router.route('/').post(addToOrder).get(getAllOrder)
// router.route('/:id').put(updateOrder).delete(deleteOrder)
// router.route('/ :shopId/:userId').get(getUserOrder)
router.route('/').post(createOrderByShopId).get(getAllOrder)
router.route('/shopId/:shopId').get(getOrderByShopID)
router.route('/userId/:userId').get(getOrderByUserID)
module.exports = router