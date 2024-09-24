const mongoose = require('mongoose');

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
    isCommercial: {
        type: Boolean,
        require: true,
        trim: false,
        unique: false
    },
    isAdmin: {
        type: Boolean,
        require: true,
        trim: false,
        unique: false
    },
    isOwner: {
        type: Boolean,
        require: true,
        trim: false,
        unique: false
    },
    isInvestor: {
        type: Boolean,
        require: true,
        trim: false,
        unique: false
    }
});

const User = mongoose.model("Users", UserSchema);

module.exports = {
    User
}