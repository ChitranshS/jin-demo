// db.js
const mongoose = require('mongoose');

let isConnected;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        await mongoose.connect('mongodb+srv://proto_one:xzdKZqFVbhAkxQUW@cluster0.y8n2ncf.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = mongoose.connection.readyState;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
