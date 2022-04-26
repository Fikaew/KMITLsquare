const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

// const createOrder = asyncHandler(async (req, res) => {
//     const newOrder = await Order.create(req.body)
//     try{
//         const savedOrder = await newOrder.save()
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// const addToOrder =  asyncHandler(async (req, res) => {
//     Order.findOne({user:req.user._id}).exec((error,order)=>{
//         if(error) return res.status(400).json({error})
//         if(order){
//             const order_ProductID = req.body.orderProduct.oProductID
//             const sameProductadd = order.orderProduct.find(data => data.oProductID == order_ProductID); 
//             const calPrice =  order.orderPrice
//             if(sameProductadd){
//                 Order.findOneAndUpdate({"user":req.user._id, "orderProduct.oProductID": order_ProductID},{
//                     "$set": {
//                         "orderProduct" : {
//                             ...req.body.orderProduct,
//                             oProductNum : sameProductadd.oProductNum + req.body.orderProduct.oProductNum
//                         } },
//                         "orderPrice" : req.body.orderProduct.oProductPrice + calPrice
//                 }).exec((error, order_sameProduct)=>{
//                     if(error) return res.status(400).json({error})
//                     if(order_sameProduct){
//                         return res.status(201).json({order_sameProduct})
//                     }
//                 })
//             }
//             else{
//                 Order.findOneAndUpdate({user:req.user.id},{
//                     "$push": {"orderProduct" : req.body.orderProduct},
//                     orderPrice: req.body.orderProduct.oProductPrice + calPrice
//                 })
//                 .exec((error, order_NewProduct)=>{
//                     if(error) return res.status(400).json({error})
//                     if(order_NewProduct){
//                         return res.status(201).json({order_NewProduct})
//                     }
//                 })
//             }

//         }
//         else{
//             const order = new Order({
//                 user: req.user.id,
//                 orderID: req.body._id,
//                 orderProduct: [req.body.orderProduct],
//                 orderPrice: req.body.orderProduct.oProductPrice
//             });
        
//             order.save((error,newOrderID)=>{
//                 if(error) return res.status(400).json({error})
//                 if(newOrderID){
//                     return res.status(201).json({newOrderID})
//                 }
//             });
//         }
//     })
    
// })

// const deleteOrder = asyncHandler(async (req, res) => {
//     const data_todelete = await Order.findOne({user:req.user._id})
//     if(!data_todelete){
//         res.status(400)
//         throw new Error("not found this order.")
//     }
//     await data_todelete.remove()
//     res.status(200).json({deleted_data: data_todelete})
// })

// const deleteProduct = asyncHandler(async (req, res) => {
//     Order.findOne({user:req.user._id}).exec((error, order) => {
//         if(error) return res.status(400).json({error})
//         if(order){
//             const order_ProductID = req.body.orderProduct.oProductID
//             const sameProductadd = order.orderProduct.find(data => data.oProductID == order_ProductID)
//             const calPrice = order.orderPrice
//             if(sameProductadd){
//                 if(sameProductadd.oProductNum ===1){
//                     sameProductadd._id.remove()
//                     return res.status(200).json({message: "product collection set to 0"})
//                 }
//                 else{
//                     Order.findOneAndUpdate({"user": req.user._id, "orderProduct.oProductID": order_ProductID}, {
//                         "$set": {
//                             "orderProduct": {
//                                 ...req.body.orderProduct,
//                                 oProductNum: sameProductadd.oProductNum - req.body.orderProduct.oProductNum
//                             }
//                         },
//                         "orderPrice": calPrice - req.body.orderProduct.oProductPrice
//                     }).exec((error, delete_sameProduct) => {
//                         if(error) return res.status(400).json({error})
//                         if(delete_sameProduct){
//                             return res.status(201).json({delete_sameProduct})
//                         }
//                     })
//                 }
//             }
//             else{
//                 Order.findOneAndUpdate({user: req.user.id}, {
//                     "$pop": {"orderProduct": req.body.orderProduct},
//                     orderPrice: req.body.orderProduct.oProductPrice - calPrice
//                 }).exec((error, _order) => {
//                     if(error) return res.status(400).json({error})
//                     if(_order){
//                         return res.status(201).json({_order})
//                     }
//                 })
//             }
//         }
//         else{
//             const order = new Order({
//                 user: req.user.id,
//                 orderID: req.body.orderID,
//                 orderProduct: [req.body.orderProduct],
//                 orderPrice: req.body.orderProduct.oProductPrice
//             })
//             order.save((error, order) => {
//                 if(error) return res.status(400).json({error})
//                 if(order){
//                     return res.status(201).json({order})
//                 }
//             })
//         }
//     })
// })

// const updateOrder = asyncHandler(async (req, res) => {
//     try{
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new: true}
//         )
//         res.status(200).json(updatedOrder)
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// const getUserOrder = asyncHandler(async (req, res) => {
//     try{
//         const userOrders = await Order.find({userId: req.params.userId})
//         res.status(200).json(userOrders)
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// const getAllOrder = asyncHandler(async (req, res) => {
//     try{
//         const orders = await Order.find()
//         res.status(200).json(orders)
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// module.exports = {
//     createOrder,
//     addToOrder,
//     deleteOrder,
//     deleteProduct,
//     updateOrder,
//     getUserOrder,
//     getAllOrder
// }

const createOrderByShopId = asyncHandler(async (req, res) => {
    const {
        orderClientID,
        orderTraderID,
        orderProduct,
        orderAddress,
        orderCancel,
        orderApprove,
        orderTrackNum,
        orderFinishClient,
        orderFinishTrader,
        orderFinish,
        orderPickup,
        orderPrice
    } = req.body
    const check_order_exist = await Order.findOne({orderTraderID, orderClientID})
    if(check_order_exist){
        res.status(400)
        throw new Error('This orderTraderID already exists')
    }
    const new_order = await Order.create({
        orderClientID: req.body.orderClientID,
        orderTraderID: req.body.orderTraderID,
        orderProduct: req.body.orderProduct,
        orderAddress: req.body.orderAddress,
        orderCancel: req.body.orderCancel,
        orderApprove: req.body.orderApprove,
        orderTrackNum: req.body.orderTrackNum,
        orderFinishClient: req.body.orderFinishClient,
        orderFinishTrader: req.body.orderFinishTrader,
        orderFinish: req.body.orderFinish,
        orderPickup: req.body.orderPickup,
        orderPrice: req.body.orderPrice
    })
    res.status(201).json({
        _id: new_order._id,
        orderClientID: new_order.orderClientID || "null",
        orderTraderID: new_order.orderTraderID || "null",
        orderProduct: new_order.orderProduct || "[]",
        orderAddress: new_order.orderAddress || "null",
    })
})

const getOrderByShopID = asyncHandler(async (req, res) =>{
    try{
        const order_by_shopID = await Order.find({orderTraderID: req.params.shopId})
        res.status(200).json(order_by_shopID)
    } catch(err){
        res.status(500).json(err)
    }
})

const getOrderByUserID = asyncHandler(async (req, res) =>{
    try{
        const order_by_userID = await Order.find({orderClientID: req.params.userId})
        console.log(order_by_userID)
        res.status(200).json(order_by_userID)
    } catch(err){
        res.status(500).json(err)
    }
})

const getAllOrder = asyncHandler(async (req, res) => {
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch(err){
        res.status(500).json(err)
    }
})

module.exports = {
    createOrderByShopId,
    getAllOrder,
    getOrderByShopID,
    getOrderByUserID
}
// Backup
// const setOrder = asyncHandler(async (req, res) => {
//     const newOrder = await Order.create(req.body)
//     try{
//         const savedOrder = await newOrder.save()
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// const updateOrder = asyncHandler(async (req, res) => {
//     try{
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new: true}
//             )
//         res.status(200).json(updatedOrder)
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// const deleteOrder = asyncHandler(async (req, res) => {
//     try{
//         await Order.findByIdAndDelete(req.params.id)
//         res.status(200).json(`Order has been deleted.`)
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// const getUserOrder = asyncHandler(async (req, res) => {
//     try{
//         const userOrders = await Order.find({userId: req.params.userId})
//         res.status(200).json(userOrders)
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// const getAllOrder = asyncHandler(async (req, res) => {
//     try{
//         const orders = await Order.find()
//         res.status(200).json(orders)
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

// module.exports = {
//     setOrder,
//     updateOrder,
//     deleteOrder,
//     getUserOrder,
//     getAllOrder
// }