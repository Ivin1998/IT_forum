const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }},
    {
        timestamps: true,
    }
)


const questions = mongoose.model("questions", questionSchema);
module.exports = questions;