const mongoose = require('mongoose');
const { Schema, model } = mongoose;

/**
 * @typedef {Object} Food
 * @property {string} id - The unique identifier for the food item.
 * @property {string} name - The name of the food item.
 * @property {number} price - The price of the food item.
 * @property {string[]} tags - An array of tags associated with the food item.
 * @property {boolean} favorite - Whether the food item is marked as a favorite.
 * @property {number} stars - The rating of the food item, represented in stars.
 * @property {string} imageUrl - The URL of the food item's image.
 * @property {string[]} origins - An array of origins where the food item is from.
 * @property {string} cookTime - The time required to cook the food item.
 */

/** @type {Food} */
const food = {
    id: '',
    name: '',
    price: 0,
    tags: [],
    favorite: false,
    stars: 0,
    imageUrl: '',
    origins: [],
    cookTime: ''
};

const FoodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, default: false },
    stars: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    origins: { type: [String], required: true },
    cookTime: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});

const FoodModel = model('food', FoodSchema);

module.exports = { FoodSchema, FoodModel };
