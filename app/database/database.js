require('dotenv').config();
const mongoose = require('mongoose');

class Database {

    constructor() {
        this.connect();
    }

    async connect() {
        await mongoose.connect(process.env.MONGODB_URI, {})
        .then(()=>{
            console.log('DB Connected Successfully !')
        }).catch((err)=>console.log(err))
    }
}

module.exports = new Database();