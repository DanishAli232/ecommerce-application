import mongoose from "mongoose";

const stripe = mongoose.Schema({
    _customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    orderDetail: {
        type: orderDetailSchema,
    },
    orderDat: {
        type: Date,
        default: Date.now(),
    },
    totalAmount: {
        type: Number,
    },
    paymentID: {
        type: String,
    },
});