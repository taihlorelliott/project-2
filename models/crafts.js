//require mongoose package
const mongoose = require("mongoose");

//create schema 
const craftSchema = new mongoose.Schema({
    category: String,
    itemName: String,
    color: String,
    inStock: Boolean,
    quantity: Number,
})

//creates the model
const Crafts = mongoose.model("Crafts", craftSchema)

//export model
module.exports = Crafts