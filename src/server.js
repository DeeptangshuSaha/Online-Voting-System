const { log } = require("console");
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const voters = require("./voter");
const vote = require("./vote");

const templatePath=path.join(__dirname,'../templates')

app.use(express.json())
app.use(express.static("public"));
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

app.get("/", (req,res)=>{
    res.render("index")
})

app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/result", (req,res)=>{
    //res.clearCookie("current-user");
    //res.end();
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
        //console.log(check)
        if(check.password == req.body.password) {
            const check2 = await voters.findOne({voterid:req.body.voterid})
            //console.log(check2)
            if (check2 == null) {
                res.render("home")
            }
            else {
                res.render("result")
            }
        }
        else {
            res.send("Wrong Password");
        }
    }
    catch{
        res.send("Wrong Credentials");
    }
    res.clearCookie("current-user");
    // res.end();
    res.cookie('current-user', req.body.voterid);
})
// Redirect the user to the login page after logout
app.get("/logout", (req, res) => {
    res.redirect("/login"); 
});

app.post("/home", async (req, res) => {
    const cookies = req.cookies;
    const currentUser = cookies['current-user'];

    // var rates = document.getElementById('Candidate').value;
    // var cand = req.body.
    // var ele = document.getElementsByName('Candidate');
    // for (i = 0; i < ele.length; i++) {
    //     if (ele[i].type = "radio") {
    //         if (ele[i].checked)
    //             var candidate = ele[i].value
    //     }
    // }
    const voter2 = {
        voterid:currentUser,
        voted:true
    }

    await voters.insertMany([voter2])
    //console.log(voter2)

    const vote2 = {
        voterid:currentUser,
        candidate:req.body.candidate
    }

    await vote.insertMany([vote2])
    //console.log(vote2)

    //console.log(candidate)
    // res.render("login")
})


app.listen(5000, () => {
    console.log("Port is Connected");
});
