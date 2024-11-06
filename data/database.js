let mongoose = require('mongoose');

const url = "mongodb://localhost:27017/customer";

mongoose.connect(url)

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB server successfully");
})
db.on('error', (err) => {
    console.log("error occured" , err);
})
db.on('disconnected', () => {
    console.log("Disconnected to MongoDB server successfully");
})