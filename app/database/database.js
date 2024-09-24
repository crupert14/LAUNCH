const mongoose = require('mongoose');
const uri ='mongodb+srv://rupertcade:CharlieAndPhoebeAndLaunch123$@main.fjiht.mongodb.net/?retryWrites=true&w=majority&appName=Main';
//https://stackoverflow.com/questions/9937953/php-database-connection-class-constructor-method
class Database {

    constructor() {
        this.connect();
    }

    async connect() {
        console.log("Attempting MongoDB connection...");
        await mongoose.connect(uri)
            .then(() => {
                console.log("Successful connection!");
            })
            .catch((err) => {
                console.log(`Unsuccesful connection: ${err}`);
            })
    }
}

module.exports = new Database();