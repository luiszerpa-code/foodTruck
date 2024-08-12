const mongoose = require('mongoose');
const { Schema, model } = mongoose;

/**
 * @typedef {Object} User
 * @property {string} id - The unique identifier for the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The hashed password of the user.
 * @property {string} name - The name of the user.
 * @property {string} address - The address of the user.
 * @property {boolean} isAdmin - Whether the user is an administrator.
 */

/** @type {User} */
const user = {
    id: '',
    email: '',
    password: '',
    name: '',
    address: '',
    isAdmin: false
};

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

const UserModel = model('user', UserSchema);

module.exports = { UserSchema, UserModel };
