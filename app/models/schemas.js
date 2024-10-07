const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address1: {
        type: String,
        default: ""
    },
    address2: { 
        type: String,
        default: ""
    },
    address3: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    }
})

const personalSchema = new mongoose.Schema ({
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    }
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        unique: false
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    active: {
        type: Boolean,
        require: true,
        default: false
    },
    token: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: addressSchema
    },
    personal: {
        type: personalSchema
    }
}, {collection: "Users"});

const User = mongoose.model("Users", UserSchema);

module.exports = {
    User
}