const mongoose=require("mongoose")

//mongodb://localhost:27017/
mongoose.connect("mongodb://127.0.0.1:27017/Online_Voting_System")
    .then(() => {
        console.log("Database is Connected");
    })
    .catch(() => {
        console.log("Database Failed to Connect");
    })

const VoterSchema = new mongoose.Schema({
    voterid: {
        type:Number,
        required:true
    },
    voted: {
        type:Boolean,
        require:true
    }
})

const voters = new mongoose.model("voteds", VoterSchema)
module.exports = voters
// module.exports = vote

