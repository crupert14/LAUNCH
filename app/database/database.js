require('dotenv').config();
const mongoose = require('mongoose');
//https://stackoverflow.com/questions/9937953/php-database-connection-class-constructor-method
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