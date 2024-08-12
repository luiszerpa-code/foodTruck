const mongoose = require('mongoose');
const { model, Schema, Types } = mongoose;

const { OrderStatus } = require('../constants/order_status');
const { Food, FoodSchema } = require('./foodmodel');

// Define LatLng schema
const LatLngSchema = new Schema({
    lat: { type: String, required: true },
    lng: { type: String, required: true }
});

// Define OrderItem schema
const OrderItemSchema = new Schema({
    food: { type: Schema.Types.Mixed, required: true }, // Replace Schema.Types.Mixed with actual schema if available
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// Define Order schema
const orderSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: 'NEW' }, // Replace 'NEW' with the actual default status if needed
    user: { type: Schema.Types.ObjectId, required: true }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

// Export OrderModel
const OrderModel = model('Order', orderSchema);

module.exports = OrderModel;
