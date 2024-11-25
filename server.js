//===================== requirements ===================
//require express package
const express = require("express")
//require dotenv to work
const dotenv = require("dotenv")
//loads the enviornmnet variables from the .env file
dotenv.config()
//require mongoose
const mongoose = require("mongoose")
//require methodoverride
const methodOverride = require("method-override");
//require morgan
const morgan = require("morgan")

const app = express();


//=========== connections /importing =========================
//connect to mongoDB using the connection string in .env
mongoose.connect(process.env.MONGODB_URI)
//log connection to confirm
mongoose.connection.on("connected", () => {
    console.log(`get connected for free to ${mongoose.connection.name}`)
})

//importing the crafts model
const Crafts = require("./models/crafts.js")


//=================use =================
//tell express to expect data 
app.use(express.urlencoded({ extended: false }));
//simulate the http methods
app.use(methodOverride("_method"));
//simplifies the http request coming in 
app.use(morgan("dev"))

//=========== gets =================
//home page
app.get("/", async (req, res) => {
    res.render("home.ejs")
})

//add new item page
app.get("/crafts/new", async (req, res) => {
    res.render("new.ejs")
})

//edit page
app.get("/crafts/:craftsId/edit", async (req,res) => {
    const allItems = await Crafts.findById(req.params.craftsId);
    res.render("edit.ejs", {
        crafts: allItems
    })
})

//category selection page 
app.get("/category", async (req, res) => {
    const allItems = await Crafts.find();
    res.render("category.ejs", { crafts: allItems })
})



//adhesive index
app.get("/crafts/adhesives", async (req, res) => {
    const allItems = await Crafts.find();
    res.render("index/adhesives.ejs", { crafts: allItems})
})

//notion index
app.get("/crafts/notions", async (req, res) => {
    const allItems = await Crafts.find();
    res.render("index/notions.ejs", { crafts: allItems})
})

//paper index
app.get("/crafts/paper", async (req, res) => {
    const allItems = await Crafts.find();
    res.render("index/paper.ejs", { crafts: allItems})
})

//textiles index
app.get("/crafts/textiles", async (req, res) => {
    const allItems = await Crafts.find();
    res.render("index/textiles.ejs", { crafts: allItems})
})

//tools index
app.get("/crafts/tools", async (req, res) => {
    const allItems = await Crafts.find();
    res.render("index/tools.ejs", { crafts: allItems})
})

//vinyl index
app.get("/crafts/vinyl", async (req, res) => {
    const allItems = await Crafts.find();
    res.render("index/vinyl.ejs", { crafts: allItems})
})

//display / show page
app.get("/crafts/:craftsId", async (req, res) => {
    //required paramaters
    const allItems = await Crafts.findById(req.params.craftsId);
    res.render("show.ejs", {crafts: allItems})
})

//============== post===================
//define routes
//post the new route to the index
app.post("/crafts", async (req, res) => {
    if (req.body.inStock === 'on') {
        req.body.inStock = true
    } else {
        req.body.inStock = false
    }
    await Crafts.create(req.body)
    console.log(req.body)
    res.redirect("/crafts/new")
})

//=============== delete ================
app.delete("/crafts/:craftsId", async (req, res) => {
    await Crafts.findByIdAndDelete(req.params.craftsId);
    res.redirect("/category")
})

//=============== put ====================
app.put("/crafts/:craftsId", async (req, res) => {
    if (req.body.inStock === 'on') {
        req.body.inStock = true
    } else {
        req.body.inStock = false
    }
    await Crafts.findByIdAndUpdate(req.params.craftsId, req.body);
    res.redirect("/category")
})
//=============listen here!==============
app.listen(3003, () => {
    console.log("listening up in this house 3003")
})