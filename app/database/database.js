require('dotenv').config();
const mongoose = require('mongoose');

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance; // If instance exists, return it
        }
        Database.instance = this; // Create an instance if it doesn't exist
        this.connect();
    }

    async connect() {
        await mongoose.connect(process.env.MONGODB_URI, {})
            .then(() => {
                console.log('DB Connected Successfully!');
            })
            .catch((err) => console.log(err));
    }
}

module.exports = new Database();