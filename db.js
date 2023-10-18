let mongoose=require("mongoose");
let connection=mongoose.connect("mongodb+srv://mrunali:mrunalibind@cluster0.tsxywrf.mongodb.net/Book?retryWrites=true&w=majority");

module.exports={connection};