const mongoose=require("mongoose")
const collection = require("./mongodb");

//mongodb://localhost:27017/
mongoose.connect("mongodb://127.0.0.1:27017/Online_Voting_System")
    .then(() => {
        console.log("Database is Connected");
    })
    .catch(() => {
        console.log("Database Failed to Connect");
    })

/*const VoteSchema = new mongoose.Schema({
    voterid: {
        type:Number,
        required:true
    },
    candidate: {
        type:String,
        require:true
    }
})*/

// const collection = new mongoose.model("users", LogInSchema)
//
// const voter = new mongoose.model("voters", VoterSchema)
const check = await collection.findOne({voterid:req.body.voterid})
const counter = new mongoose.model("votes", VoteSchema)
// module.exports = voter
module.exports = counter

