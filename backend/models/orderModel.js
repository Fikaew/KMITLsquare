const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    // orderID: {
    //     type: String,
    //     //required: true,
    // },
    orderClientID: {
        type: String,
        //required: true
    },
    orderTraderID: {
        type: String,
        //required: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     //required: true,
    //     ref: 'User'
    // },
    // shop: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     //required: true,
    //     ref: 'Shop'
    // },
    orderProduct: [{
        oProductID: {
            type: String,
            //required: true
        },
        orderProductNum: {
            type: Number,
            //required: true
        },
        orderProductPrice: {
            type: Number,
            //required: true
        }
    }],
    orderAddress: {
        type: String,
    },
    orderCancel: {
        type: Boolean,
        //required: true
    },
    orderApprove: {
        type: Boolean,
        //required: true
    },
    orderTrackNum: {
        type: String
    },
    orderFinishClient: {
        type: Boolean,
        //required: true
    },
    orderFinishTrader: {
        type: Boolean,
        //required: true
    },
    orderFinish: {
        type: Boolean,
        //required: true
    },
    orderPickup: {
        oPickupPlace: {
            type: String
        },
        oPickupTime: {
            type: String
        }
    },
    orderPrice: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)