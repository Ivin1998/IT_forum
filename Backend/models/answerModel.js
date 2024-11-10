const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    qn_id:{
        type:String,
        required:false,
        default:null

    },
    question:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:false,
        default:null
    },
    category:{
        type:[String],
        required:false,
        default:'others'
    }},
    {
        timestamps: true,
    }
)


const answers = mongoose.model("answers", answerSchema);
module.exports = answers;