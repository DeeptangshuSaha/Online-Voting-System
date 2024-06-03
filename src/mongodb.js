const mongoose=require("mongoose")

//mongodb://localhost:27017/
mongoose.connect("mongodb://127.0.0.1:27017/Online_Voting_System")
.then(() => {
    console.log("Database is Connected");
})
.catch(() => {
    console.log("Database Failed to Connect");
})

const LogInSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    voterid: {
        type:Number,
        required:true
    },
    mobile: {
        type:Number,
        required:true
    },
    password: {
        type:Number,
        required:true
    }
})

// const VoteSchema = new mongoose.Schema({
//     voterid: {
//         type:Number,
//         required:true
//     },
//     voted: {
//         type:Boolean,
//         require:true
//     }
// })

const collection = new mongoose.model("users", LogInSchema)
module.exports = collection

