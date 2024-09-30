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
    active: {
        type: Boolean,
        require: true,
        default: false
    }
}, {collection: "Users"});

const AdminSchema = new mongoose.Schema({
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
    }
}, {collection: "Admins"});

const InvestorSchema = new mongoose.Schema({
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
    }
}, {collection: "Investors"});

const OwnerSchema = new mongoose.Schema({
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
    }
}, {collection: "Owners"});

const AllUsersSchema = new mongoose.Schema({
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
    accountType: {
        type: String,
        require: true
    }
}, {collection: "AllUsers"});

const User = mongoose.model("Users", UserSchema);
const Admin = mongoose.model("Admins", AdminSchema);
const Investor = mongoose.model("Investors", InvestorSchema);
const Owner = mongoose.model("Owners", OwnerSchema);
const All = mongoose.model("AllUsers", AllUsersSchema);

module.exports = {
    User,
    Admin,
    Investor,
    Owner,
    All
}