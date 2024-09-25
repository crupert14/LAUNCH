require('dotenv').config();
const mongoose = require('mongoose');
const uri ='mongodb+srv://rupertcade:CharlieAndPhoebeAndLaunch123$@main.fjiht.mongodb.net/Accounts?retryWrites=true&w=majority&appName=Main';
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