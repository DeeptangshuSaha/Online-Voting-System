const { log } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath=path.join(__dirname,'../templates')

app.use(express.json())
app.use(express.static("public"));
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/", (req,res)=>{
    res.render("index")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/result", (req,res)=>{
    res.render("result")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})
// Signup
app.post("/signup", async (req,res) => {
    const data = {
        name:req.body.name,
        voterid:req.body.voterid,
        mobile:req.body.mobile,
        password:req.body.password
    }
    
    await collection.insertMany([data])
    res.render("login")
})
// Login 
app.post("/login", async (req,res) => {
    
    try{
        const check = await collection.findOne({voterid:req.body.voterid})
        if(check.password == req.body.password) {
            res.render("home")
        }
        else {
            res.send("Wrong Password");
        }
    }
    catch{
        res.send("Wrong Credentials");
    }
})
// Redirect the user to the login page after logout
app.get("/logout", (req, res) => {
    res.redirect("/login"); 
});


app.listen(5000, () => {
    console.log("Port is Connected");
});
